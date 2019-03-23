// round user thumbnails
import React from "react";

// styles
import { Thumb } from "./styles/containers";

const UserThumb = props => {
  const { avatarUrl, login, name, url } = props;
  const displayName = name ? name : login;

  return (
    <Thumb>
      <a href={url}>
        <img src={avatarUrl} alt={login} />
      </a>
      <p>{displayName}</p>
    </Thumb>
  );
};

export default UserThumb;
