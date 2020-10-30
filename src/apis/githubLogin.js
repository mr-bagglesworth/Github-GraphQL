const base64 = require('base-64');

// this is why this no longer works:
// https://developer.github.com/changes/2020-02-14-deprecating-password-auth/
const githubLogin = (name, pwd, clientId, clientSecret) => {
  const bytes = name.trim() + ':' + pwd.trim();
  const encoded = base64.encode(bytes);

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + encoded,
      'User-Agent': 'GitHub Issue Browser',
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/vnd.github.inertia-preview+json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      scopes: ['user', 'repo'],
      note: 'not abuse',
    }),
  }).then((response) =>
    response.json().then((json) => {
      if (response.status < 400) {
        return json.token;
      } else {
        throw new Error(json.message);
      }
    })
  );
};
export { githubLogin };
