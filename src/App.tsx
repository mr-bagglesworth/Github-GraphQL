import React, { Fragment, useEffect, useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import { graphqlClient } from './apis/graphqlClient';

import Header from './components/Header';
import Login from './components/Login';
import Search from './components/Search';
import UserDetails from './components/user/UserDetails';
import UserRepos from './components/repo/UserRepos';

import { colors, gradient } from './styles/styleVars';
import { browserStorage } from './utils/browserStorage';

const apiToken = process.env.REACT_APP_TOKEN;
const isLocal = process.env.NODE_ENV === 'development';

const App = () => {
  const [auth, setAuth] = useState<{ login: boolean; token: string | undefined }>({
    login: false,
    token: '',
  });
  const [search, setSearch] = useState<{
    username: string | undefined;
    searchType: string | undefined;
  }>({ username: '', searchType: 'userdetails' });

  console.log('apiToken', apiToken);

  useEffect(() => {
    if (isLocal) {
      setAuth({ login: true, token: apiToken });
    } else {
      const token = browserStorage('get');
      if (token) {
        setAuth({ login: true, token });
      }
    }
  }, []);

  useEffect(() => {
    const bgColor = colors[!auth.login ? 'bgPink' : 'bgBlue'];
    document.body.style.background = gradient(bgColor).join('');
  }, [auth.login]);

  const logoutSubmit = () => {
    browserStorage('remove');
    setAuth({ login: false, token: '' });
  };

  const loginSubmit = (accessToken: string) => {
    browserStorage('set', accessToken);
    setAuth({ login: true, token: accessToken });
  };

  type FormDetails = {
    username: string;
    searchType: string;
    formError?: boolean;
  };
  const searchSubmit = (formDetails: FormDetails) => {
    const { searchType, username } = formDetails;
    setSearch({ searchType, username });
  };

  const { login, token } = auth;
  const { username, searchType } = search;
  const state = { login, searchType, token, username };

  const client = token && graphqlClient(token);
  return (
    <div className="container">
      <Header loginStatus={login} logoutSubmit={logoutSubmit} />
      {login ? (
        <Fragment>
          <p>Enter a valid Github username to start searching...</p>
          <Search {...state} searchSubmit={searchSubmit} loginStatus={login} />
          {client && (
            <ApolloProvider client={client}>
              {username && searchType === 'userdetails' && <UserDetails login={username} />}

              {username && searchType === 'repodetails' && <UserRepos login={username} />}
            </ApolloProvider>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <p>Enter your Github username and password to start searching.</p>
          <Login loginSubmit={loginSubmit} loginStatus={login} />
        </Fragment>
      )}
    </div>
  );
};

export default App;
