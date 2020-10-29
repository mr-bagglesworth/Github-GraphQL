import React from "react";

import RepoDetailToggle from "./RepoDetailToggle";
import { dateFormat } from "../../utils/utils";
import { Repo } from "../../styles/repoContainers";

const SmallRepo = props => {
  const { onClick, createdAt, isFork, name, primaryLanguage, updatedAt, stargazers, watchers } = props;

  // pass owner and name into RepoDetailToggle
  // - toggle LargeRepo
  const owner = props.owner.login;

  // primaryLanguage can be null. If so, styled component makes this grey
  const langColor = primaryLanguage ? primaryLanguage.color : null;
  const langName = primaryLanguage ? primaryLanguage.name : "N/A";

  // combine created and updated if on same date
  return (
    <>
      <Repo langColor={langColor} langName={langName}>
        <h3>{name}</h3>
        <p>
          Created: {dateFormat(createdAt)} | Last Updated: {dateFormat(updatedAt)} {isFork && "| Forked"}
        </p>
        <p>
          Main Language: <span className="language">{langName}</span>
        </p>
        <p>
          {stargazers.totalCount} Stargazers | {watchers.totalCount} Watchers
        </p>
        <RepoDetailToggle onClick={onClick} owner={owner} name={name} direction={"forwards"} />
      </Repo>
    </>
  );
};

export { SmallRepo };
