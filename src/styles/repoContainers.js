import styled from "styled-components";
import { colors, fontSize, boxShadow } from "./styleVars";

// - - - - - - - - - - -
// repo sliding container
// - contains <ul> and LargeRepo.js
// - takes props to transform left
// - change to div container, ul and div as siblings
const RepoContainer = styled.div`
  overflow: hidden; // cuts off box shadow on containers
  > div {
    display: flex;
    align-items: flex-start;
    width: 200%;
    transition: transform ease-in-out 0.75s;
    ${(props) => (props.expanded ? `transform: translateX(-50%)` : "")};
    > ul,
    > div {
      width: 50%;
    }
    ${(props) => (props.expanded ? `li{box-shadow: none;}` : "")};
  }
`;

// - - - - - - - - - - -
// repo containers
// - base style
const RepoBase = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  background-color: ${colors.white};
  box-shadow: ${boxShadow.out};
  border-radius: 0.25rem;
  // heading
  h3 {
    font-size: ${fontSize.med};
  }
`;

// 1.
// - simple repo with coloured border at the top
const Repo = styled(RepoBase)`
  padding: 1rem;
  // language colours
  border-top: 1rem solid ${(props) => (props.langColor ? props.langColor : "white")};
  .language {
    padding: 0.125rem 0.25rem;
    background-color: ${(props) => (props.langColor ? props.langColor : colors.grey)};
    color: ${(props) => (props.langName === "JavaScript" ? colors.black : colors.white)};
  }
  // button position
  button {
    align-self: flex-end;
    @media screen and (min-width: 35rem) {
      position: absolute;
      top: calc(50% - 2rem);
    }
  }
`;

// - - - - - - - - - - -
// repo features

// - generic section
const RepoSection = styled.section`
  margin-top: 1rem;
  ${(props) =>
    props.borderTop
      ? `margin-top: 0.5rem;
    padding-top: 1rem;
    border-top: 0.125rem solid ${colors.grey};`
      : ""};
  // spans for stats
  span {
    margin: 0 0.125rem;
    color: ${colors.darkGrey};
  }
`;

// - - - - - - - - - - -
// 2.
// - filesize data

// - - - - - - - - - - -
// 3. language chart and data
// - language chart
const LangChart = styled.div`
  display: flex;
  height: 2rem;
  margin-bottom: 0.5rem;
`;

// - language cells
const LangCell = styled.div`
  cursor: pointer;
  width: ${(props) => (props.cellWidth ? `${props.cellWidth}%` : "auto")};
  background-color: ${(props) => (props.colorHex ? props.colorHex : "white")};
  // add a border if colour is null
  ${(props) => (props.colorHex ? "" : `border: 0.05rem solid ${colors.black}`)};
`;

// - language labels
const LangLabel = styled.li`
  display: flex;
  align-items: center;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  .dot {
    display: inline-block;
    margin-right: 0.25rem;
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    background-color: ${(props) => (props.colorHex ? props.colorHex : "white")};
    // add a border if colour is null
    ${(props) => (props.colorHex ? "" : `border: 0.05rem solid ${colors.black}`)};
  }
  span {
    margin-left: 0.25rem;
    color: ${colors.darkGrey};
  }
`;

// - - - - - - - - - - -
// 4. commit chart
const CommitChart = styled.div`
  display: flex;
  align-items: flex-end;
  height: calc(6 * 2rem);
  margin: 0.5rem 0;
  padding: 0.125rem 0.5rem;
  border-bottom: 0.05rem solid ${colors.midGrey};
  > div {
    width: ${(props) => (props.barWidth ? `${props.barWidth}%` : "auto")};
  }
`;

// set the height, border, and background colour
const CommitCol = styled.div`
  height: ${(props) => (props.barHeight ? `${props.barHeight}%` : 0)};
  // no colour, border or cursor if no prop
  ${(props) => (props.barHeight ? `border: 0.05rem solid ${colors.white}` : "")};
  ${(props) => (props.barHeight ? `background-color: rgba(3, 72, 163, ${props.barColour})` : "")};
  ${(props) => (props.barHeight ? `cursor: pointer` : "")};
`;

export { RepoContainer, Repo, RepoSection, LangChart, LangCell, LangLabel, CommitChart, CommitCol };
