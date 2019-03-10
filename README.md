# Github GraphQL

An example of using Github GraphQL API with Apollo React. An experiment with making GraphQL queries in React.

## To get running:

- clone the repository
- `npm install`
- create a **config.js** file in the **src** folder with your github username and password in:
  `export const username = "your-username";`
  `export const password = "your-password";`
- `npm start` to view the app locally at [http://localhost:3000/](http://localhost:3000/)

### Using this app:

Runnable Queries Include:

- Get details on user by entering **username**
- Get details on all of a user's repositories by entering **username**
- Get details of a particular repository by entering **username**, checking 'Get User's Repositories', and clicking on the **repository name** you want to view

#### Components and todo list

- Repository.js: API call for individual repository

1. update old bits of apollo **stuck**
2. get working with single query (for repo), hardcoded
3. autocomplete
4. user details query
5. user repos query

**other:**

- linting
- testing (unit, then integration)
- code coverage
- CI pipeline
- add issues (todos) to Github
