// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fontSize, boxShadow } = styleVars;

// repo list item
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

// 2.
const RepoData = styled.div`
  margin-top: ${spacing.small};
  padding-top: ${spacing.large};
  border-top: ${spacing.xSmall} solid ${colors.grey};
  h4:nth-child(2) {
    margin-top: ${spacing.small};
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
`;

// 3.
const RepoLang = styled.li`
  display: flex;
  align-items: center;
  margin-right: ${spacing.large};
  span {
    display: inline-block;
    margin-right: ${spacing.small};
    width: ${spacing.large};
    height: ${spacing.large};
    border-radius: ${spacing.med};
    background-color: ${props => (props.color ? props.color : "white")};
  }
`;

export { RepoContainer, Repo, RepoData, RepoLang };
