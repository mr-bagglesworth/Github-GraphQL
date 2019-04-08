// repoContainers - anything specific to repos

// get variables
import styled from "styled-components";
import styleVars from "./styleVars";
const { colors, spacing, fontSize, boxShadow } = styleVars;

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
    ${props => (props.expanded ? `transform: translateX(-50%)` : "")};
    > ul,
    > div {
      width: 50%;
    }
    ${props => (props.expanded ? `li{box-shadow: none;}` : "")};
  }
`;

// - - - - - - - - - - -
// repo containers
// - base style
const RepoBase = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: ${spacing.xLarge};
  background-color: ${colors.white};
  box-shadow: ${boxShadow.out};
  border-radius: ${spacing.small};
  // heading
  h3 {
    font-size: ${fontSize.med};
  }
`;

// 1.
// - simple repo with coloured border at the top
const Repo = styled(RepoBase)`
  padding: ${spacing.large};
  // language colours
  border-top: ${spacing.large} solid ${props => (props.langColor ? props.langColor : "white")};
  .language {
    padding: ${spacing.xSmall} ${spacing.small};
    background-color: ${props => (props.langColor ? props.langColor : colors.grey)};
    color: ${props => (props.langName === "JavaScript" ? colors.black : colors.white)};
  }
  // button position
  button {
    align-self: flex-end;
    @media screen and (min-width: 35rem) {
      position: absolute;
      top: calc(50% - ${spacing.xLarge});
    }
  }
`;

// - - - - - - - - - - -
// repo features

// - generic section
const RepoSection = styled.section`
  margin-top: ${spacing.large};
  ${props =>
    props.borderTop
      ? `margin-top: ${spacing.med};
    padding-top: ${spacing.large};
    border-top: ${spacing.xSmall} solid ${colors.grey};`
      : ""};
  // spans for stats
  span {
    margin-left: ${spacing.small};
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
  height: ${spacing.xLarge};
  margin-bottom: ${spacing.med};
`;

// - language cells
const LangCell = styled.div`
  cursor: pointer;
  width: ${props => (props.cellWidth ? `${props.cellWidth}%` : "auto")};
  background-color: ${props => (props.colorHex ? props.colorHex : "white")};
  // add a border if colour is null
  ${props => (props.colorHex ? "" : `border: 0.05rem solid ${colors.black}`)};
`;

// - language labels
const LangLabel = styled.li`
  display: flex;
  align-items: center;
  margin-right: ${spacing.large};
  margin-bottom: ${spacing.small};
  .dot {
    display: inline-block;
    margin-right: ${spacing.small};
    width: ${spacing.large};
    height: ${spacing.large};
    border-radius: ${spacing.med};
    background-color: ${props => (props.colorHex ? props.colorHex : "white")};
    // add a border if colour is null
    ${props => (props.colorHex ? "" : `border: 0.05rem solid ${colors.black}`)};
  }
  span {
    margin-left: ${spacing.small};
    color: ${colors.darkGrey};
  }
`;

// - - - - - - - - - - -
// 4. commit chart
export { RepoContainer, Repo, RepoSection, LangChart, LangCell, LangLabel };
