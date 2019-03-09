// React
import React from "react";

// this component needs to trigger state changes in App.js:
// - username
// - suggestions
// - userdetails or repodetails

// allow the user to enter their search terms here
// - autocomplete for name search
// - dropdown with repo list after user entered name

// this should be a class component
// - keep state
// - affect state in app.js, which triggers api calls, and populates components:
// - Repository
// - UserDetails
// - UserRepos
const Search = props => {
  return (
    <div className="container">
      <h1>Github GraphQL API</h1>
      <p>Search Github users and their repositories with GraphQL API</p>
      <form>
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
      </form>
    </div>
  );
};

export default Search;
