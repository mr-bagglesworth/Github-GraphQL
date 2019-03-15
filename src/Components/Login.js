// React
import React from "react";

// login and authentication
import { githubLogin } from "../utils/githubLogin";

// styles
import { BasicForm, FormButton } from "./styles/forms";

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
    this.setState({ ...items });
  };

  // this will create a token, loggin the use in in app.js
  handleLoginSubmit = e => {
    e.preventDefault();

    const { username, password } = this.state;
    // lazy check
    // - need an error message if token fails
    if (username.length > 2 && password.length > 5) {
      githubLogin(username, password).then(token => {
        this.props.loginSubmit(token);
      });
    } else {
      this.setState({ formError: true });
    }
  };

  render() {
    return (
      <BasicForm>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" onChange={this.handleInput} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" onChange={this.handleInput} />
        </div>
        <div>
          <FormButton
            type="submit"
            value="Submit"
            onClick={e => this.handleLoginSubmit(e)}
          />
        </div>
        {this.state.formError && (
          <p>Please fill in your details to start searching</p>
        )}
      </BasicForm>
    );
  }
}
