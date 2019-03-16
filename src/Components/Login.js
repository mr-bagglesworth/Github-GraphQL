// React
import React from "react";

// login and authentication
import { githubLogin } from "../utils/githubLogin";

// components
import LoginText from "./LoginText";

// styles
import { LoginForm, TextInput } from "./styles/forms";
import { Button } from "./styles/buttons";

// convert a username and password into a token
// - use this token to log the user in in app.js
export default class Login extends React.Component {
  state = {
    username: "",
    password: "",
    formError: false
  };

  // universal handle input method
  // https://goo.gl/9p2vKq - password autocomplete
  handleInput = e => {
    const items = JSON.parse(JSON.stringify(this.state));
    items[e.target.id] = e.target.value;
    // reset the error message
    if (e.target.value.length < 2) items.formError = false;
    this.setState({ ...items });
  };

  // this will create a token, loggin the use in in app.js
  handleLoginSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    // lazy check
    // - need an error message if token fails
    if (username.length > 2 && password.length > 4) {
      githubLogin(username, password)
        .then(token => {
          this.props.loginSubmit(token);
        })
        .catch(err => this.setState({ formError: true })); // logs bad credentials
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <>
        <LoginForm>
          <div>
            <label htmlFor="username">Username</label>
            <TextInput id="username" type="text" onChange={this.handleInput} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <TextInput
              id="password"
              type="password"
              onChange={this.handleInput}
            />
          </div>
          <div>
            <Button
              loginStatus={this.props.loginStatus}
              type="submit"
              value="Login"
              onClick={e => this.handleLoginSubmit(e)}
            />
          </div>
          {this.state.formError && (
            <p>Your username or password was incorrect. Please try again.</p>
          )}
        </LoginForm>
        <LoginText loginStatus={this.props.loginStatus} />
      </>
    );
  }
}
