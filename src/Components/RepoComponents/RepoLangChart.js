// RepoLangChart.js
// - language chart and % data
import React from "react";

// utils and styles
import { objMake, arrMake, arrToObj } from "../../utils/utils";
import { RepoSection, LangChart, LangCell, LangLabel } from "../styles/repoContainers";

const RepoLangChart = props => {
  const { edges } = props;
  // combine language and size into array of single objects
  const details = objMake(edges, "node");
  const size = arrMake(edges, "size");
  const languages = arrToObj(details, size);

  // get % width of each block
  const Xer = 100 / size.reduce((a, b) => a + b);

  // cell and label arrays - avoids looping twice
  const cells = [],
    labels = [];

  // chart cells and labels
  // - push components to arrays to be rendered later
  languages.map(item => {
    const { size, color, name } = item;
    const percentSize = Xer * size;
    cells.push(<LangCell key={name} title={`${percentSize.toFixed(0)}% ${name}`} cellWidth={percentSize} colorHex={color} />);
    labels.push(
      <LangLabel key={name} colorHex={color}>
        <span className="dot" />
        {name} - <span>{percentSize < 0.01 ? "< 0.01%" : `${percentSize.toFixed(2)}%`}</span>
      </LangLabel>
    );
    // arrow function requires a return statement
    return false;
  });

  // do the rendering
  return (
    <RepoSection>
      <h3>Language Breakdown:</h3>
      <LangChart>{cells}</LangChart>
      <ul>{labels}</ul>
    </RepoSection>
  );
};
export default RepoLangChart;
