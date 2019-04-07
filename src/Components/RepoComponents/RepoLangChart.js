import React from "react";

// utils
import { objMake, arrMake, arrToObj } from "../../utils/utils";

// styles
import { RepoChart, ChartCell } from "../styles/repoContainers";

// displays language chart
const RepoLangChart = props => {
  // combine language and size into array of single objects
  const details = objMake(props, "node");
  const size = arrMake(props, "size");
  const languages = arrToObj(details, size);

  // % width of each block
  const Xer = 100 / size.reduce((a, b) => a + b);

  return (
    <>
      <h4>Language Breakdown:</h4>
      <RepoChart>
        {languages.map(item => {
          const { size, color, name } = item;
          const cellWidth = Xer * size;
          return <ChartCell key={name} title={`${cellWidth.toFixed(0)}% ${name}`} cellWidth={cellWidth} colorHex={color} />;
        })}
      </RepoChart>
    </>
  );
};
export default RepoLangChart;
