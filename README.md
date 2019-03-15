# Github GraphQL

[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![Build Status](https://travis-ci.org/mr-bagglesworth/Github-GraphQL.svg?branch=master)](https://travis-ci.org/mr-bagglesworth/Github-GraphQL)
[![codecov](https://codecov.io/gh/mr-bagglesworth/Github-GraphQL/branch/master/graph/badge.svg)](https://codecov.io/gh/mr-bagglesworth/Github-GraphQL)

A first foray into using Github GraphQL API with React Apollo.

View the live app here:

[https://mr-bagglesworth.github.io/Github-GraphQL/](https://mr-bagglesworth.github.io/Github-GraphQL/)

## To get running locally:
- clone the repository
- `npm install`
- go to your github account and [generate a personal access token](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)
- create an `.env.local` file in the root, with your access token in the following format:  
  `REACT_APP_GET_ME_IN=your-token-here`. Note that your token does not require quotes around it
- `npm start` to view the app locally at [http://localhost:3000/](http://localhost:3000/)


![](https://i.imgur.com/IPVxZ7I.png)
> main search form

![](https://i.imgur.com/bM19p43.png)
> sample result: user details


### Using this app:
1. Enter a valid github **Username** in the text input field, then...
- Search for **User Details** by toggling 'Get User Details' and pressing 'Submit'
- Search for **User's Repositories** by toggling 'Get User's Repositories' and pressing 'Submit'

2. **In Progress:** Get more details about a **User's Repository**
- With a list of a user's repositories showing, click on a single repository
- More information on the clicked repository then displays
- Option to star the repository

#### Todo:
- show single repo information (on repo click)
- more styling
- autocomplete (for user name. Look into the feasibility of this more)
- linting (customise the setup a little bit more)
- testing (unit, then integration)
- ~~code coverage (with Jest, Codecov, and commands in .travis.yml)~~
- ~~CI pipeline (Travis)~~
- ~~deploy on github pages~~ (making search function work properly on gh-pages is tricky)