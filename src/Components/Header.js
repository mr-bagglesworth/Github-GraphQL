import React from "react";

import { SmallHeaderText, HeaderLabel } from "../styles/text";
import { TextButton } from "../styles/buttons";

const Header = ({ loginStatus, logoutSubmit }) => {

  // This is used to show / hide a logout button for those on github pages
  const showLogout = loginStatus && process.env.NODE_ENV !== "development";

  return (
    <>
      {showLogout && (
        <SmallHeaderText>
          <p>
            You are logged in and on github pages.{" "}
            <TextButton onClick={logoutSubmit}>
              Click here to log out
            </TextButton>
          </p>
        </SmallHeaderText>
      )}
      <HeaderLabel loginStatus={loginStatus}>Github GraphQL API</HeaderLabel>
      <p>Search Github users and their repositories with GraphQL API</p>
    </>
  );
};

export default Header;
