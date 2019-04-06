import React from "react";

// utils
import { repoSize } from "../../utils/utils";

// styles
import { RepoData, RepoLang } from "../styles/repoContainers";

// displays:
// - total byte size of repo
// - languages of repo
const RepoFileData = props => {
  const { nodes, totalSize } = props;

  return (
    <RepoData>
      <h4>Repository Size:</h4>
      {repoSize(totalSize)}
      {nodes.length > 0 && (
        <>
          <h4>Languages:</h4>
          <ul>
            {nodes.map(item => {
              return (
                <RepoLang key={item.name} colorHex={item.color}>
                  <span />
                  {item.name}
                </RepoLang>
              );
            })}
          </ul>
        </>
      )}
    </RepoData>
  );
};
export default RepoFileData;
