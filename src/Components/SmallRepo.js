// shown in user's repo list
import React from "react";

// utils
import { dateFormat } from "../utils/utils";

// styles
import { Repo } from "./styles/containers";
// import { SmallButton } from "./styles/buttons";

/* 

small repo details + functions (no thumbnails):
- name
- created and updated
- language and colour
- stargazers and watchers count
+ expand / more info
~ to add = style to say if repo is forked
~ order date descending / ascending
~ user thumbnails if group project

large repo details + functions (see tech test)
- image / avatarUrl
- name
- link
- created and updated
- language and colour
- stargazers and watchers:
    - name, avatarUrl, url
+ fave locally
+ fave on github
+ watch on github    

*/

// needs to be more versatile - handle single and group projects
const SmallRepo = props => {
  const {
    createdAt,
    isFork,
    name,
    primaryLanguage,
    // primaryLanguage: { color },
    pushedAt,
    stargazers,
    watchers
  } = props;

  console.log(props);

  //   primaryLanguage can be null
  const langColor = primaryLanguage ? primaryLanguage.color : null;
  const langName = primaryLanguage ? primaryLanguage.name : "N/A";

  // collaborators can be null - group projects only
  // - doesn't like this search in parent component
  // console.log(collaborators);
  // collaborators(first: 100) {
  //   totalCount
  //   edges {
  //     node {
  //       id
  //       name
  //       login
  //       url
  //     }
  //   }
  // }
  // <SmallButton>Expand +</SmallButton>

  return (
    <Repo langColor={langColor} langName={langName}>
      <h3>{name}</h3>
      <p>
        Created: {dateFormat(createdAt)} | Updated: {dateFormat(pushedAt)}{" "}
        {isFork && "| Forked"}
      </p>
      <p>
        Main Language: <span className="language">{langName}</span>
      </p>
      <p>
        {stargazers.totalCount} Stargazers | {watchers.totalCount} Watchers
      </p>
    </Repo>
  );
};

export default SmallRepo;
