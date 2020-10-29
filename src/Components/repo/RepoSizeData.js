// RepoSizeData.js
// - total byte size of repo (on the disk) - maybe indicative of git history?
// - total byte size of code the user has written
import React from "react";

// utils and styles
import { repoSize } from "../../utils/utils";
import { RepoSection } from "../../styles/repoContainers";

const RepoSizeData = props => {
  const { disk, size } = props;

  return (
    <RepoSection borderTop={true}>
      <h3>Size Stats:</h3>
      <p>
        Total Code Written - <span>{repoSize(size)}</span>
      </p>
      <p>
        Space on Disk - <span>{repoSize(disk)}</span>
      </p>
    </RepoSection>
  );
};
export default RepoSizeData;
