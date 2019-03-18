// shown in user's repo list
import React from "react";

// utils
import { dateFormat } from "../utils/utils";

// styles
import { Repo } from "./styles/containers";
import { SmallButton } from "./styles/buttons";

/* structure:
- though parent structure may change, this can be built out as an independent component
- simpler query in UserRepos parent component, don't need all this info
- pass repo id into button click, this will load LargeRepo.js
    - this will run a query that pulls up more information

small repo details + functions (no thumbnails):
- name
- created and updated
- language and colour
- stargazers and watchers count
+ expand / more info
~ to add = say if repo is forked
~ order date descending

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

const SmallRepo = props => {
  const {
    createdAt,
    name,
    primaryLanguage,
    // primaryLanguage: { color },
    pushedAt,
    stargazers,
    watchers
  } = props;

  //   primaryLanguage can be null, create an object if so
  const langDetails = primaryLanguage
    ? { name: primaryLanguage.name, color: primaryLanguage.color }
    : { name: "N/A", color: null };
  //   console.log(langDetails);

  return (
    <Repo lang={langDetails}>
      <h3>{name}</h3>
      <p>
        Created: {dateFormat(createdAt)} | Updated: {dateFormat(pushedAt)}
      </p>
      <p>
        Main Language: <span className="language">{langDetails.name}</span>
      </p>
      <p>
        {stargazers.totalCount} Stargazers | {watchers.totalCount} Watchers
      </p>
      <SmallButton>Expand +</SmallButton>
    </Repo>
  );
};

export default SmallRepo;
