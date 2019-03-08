// React
import React from "react";

// this component needs to trigger state changes in App.js:
// - username
// - suggestions
// - userdetails or repodetails

// allow the user to enter their search terms here
// - autocomplete for name search
// - dropdown with repo list after user entered name
const Search = props => {
  return (
    <div>
      <h1>GraphQL Test</h1>
      <p>Trying out the Github GraphQL API for the first time</p>
      <div>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" />
          <ul>
            <li>suggestions</li>
          </ul>
        </div>
        <div>
          <label htmlFor="userdetails">Get User's Details</label>
          <input type="radio" name="userdetails" id="userdetails" />
          <label htmlFor="userdetails">Get User's Repositories</label>
          <input type="radio" name="repodetails" id="repodetails" />
        </div>
      </div>
    </div>
  );
};

export default Search;
