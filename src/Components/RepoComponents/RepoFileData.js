import React from "react";

// styles
import { RepoData, RepoLang } from "../styles/repoContainers";

// displays:
// - total byte size of repo
// - languages of repo
const RepoFileData = props => {
  const { nodes, totalSize } = props;
  // show mb if > 1 million
  const mb = totalSize > Math.pow(10, 6) ? (totalSize / Math.pow(10, 6)).toFixed(2) : null;
  return (
    <RepoData>
      <h4>Repository Size:</h4>
      {totalSize} bytes {mb && <>({mb} mb)</>}
      {nodes.length > 0 && (
        <>
          <h4>Languages:</h4>
          <ul>
            {nodes.map(item => {
              return (
                <RepoLang key={item.color} color={item.color}>
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
