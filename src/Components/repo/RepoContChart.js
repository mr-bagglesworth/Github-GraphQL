import React from "react";

import { dateDiff, arrMake, arrDate } from "../../utils/utils";
import { CommitChart, CommitCol } from "../../styles/repoContainers";

/*

how it works:
1. columns = no. of days repo has been worked on for. Newest date - Oldest date
2. rows = max daily commit count
3. create a new array based on column count, and map through it
4. map through new array, filter each item for the repo (from props) with same date.
5. IF same date, return repo (from prop), ELSE return object with commitCount = 0, date = Oldest date + (index * 24hrs)

todos:
- audit for efficiency:
  - cut down on loops
  - render fewer divs in chart
      - could use calculations for absolute positioning
      - draw an svg
      - use d3
  - try using performance.now

- show date + commit count on bar hover
- optimise for long term repos
  - e.g. able mediation, can't see bars, width too thin
  - if > 1 month, add sideways scroll
- give bars a max width (one big block if worked on for one day)

- getting some infinties with calculations of chartColumns

*/


const RepoContChart = props => {
  const { repos, totalCount } = props;

  // 1.
  // get date range (count of dates from first to last)
  // - calculate columns
  const oldest = repos[0].occurredAt;
  const newest = repos[repos.length - 1].occurredAt;
  const chartColumns = dateDiff(newest, oldest);
  // % width of columns
  const barWidth = 100 / chartColumns;
  // console.log(barWidth, "% width columns");

  // 2.
  // get max daily commit count (relative height of bars/points on the chart)
  // - calculate rows
  const maxHeight = Math.max(...arrMake(repos, "commitCount"));
  // get height of each bar
  const calcHeight = (commitCount, maxCommits) => (100 / maxCommits) * commitCount; // console.log(maxHeight, "max daily commits");
  // get colour of each bar (> 0.2 opacity)
  const calcColour = height => (100 - height) / 500 + height / 100;

  // 3.
  // compose bars in charchart
  const bars = Array(chartColumns)
    .fill(0)
    .map((v, i) => {
      // 4.
      // find the object from props with the same date
      // - use arrDate
      const obj = repos.find(item => new Date(item.occurredAt).toLocaleDateString() === arrDate(oldest, i));
      return obj !== undefined
        ? obj
        : {
            commitCount: 0,
            occurredAt: arrDate(oldest, i)
          };
    });

  // return a title for each bar
  // - make a count / plural function for this and total count?
  const isTitle = (commits, date) =>
    commits > 0 ? (commits === 1 ? `${commits} commit made on ${date}` : `${commits} commits made on ${date}`) : "";

  // return the html
  return (
    <>
      <p>
        {totalCount} {""}
        {totalCount === 1 ? "Contribution" : "Contributions"}
        {""} in total. Worked on{" "}
        {chartColumns < 365 ? (chartColumns < 2 ? `over ${chartColumns} day` : `over ${chartColumns} days`) : "for more than a year"}{" "}
      </p>
      <CommitChart barWidth={barWidth}>
        {bars.map((v, i) => (
          <CommitCol
            key={`key_${i}`}
            title={isTitle(v.commitCount, new Date(v.occurredAt).toLocaleDateString())}
            barHeight={calcHeight(v.commitCount, maxHeight)}
            barColour={calcColour(calcHeight(v.commitCount, maxHeight))}
          />
        ))}
      </CommitChart>
    </>
  );
};

export default RepoContChart;
