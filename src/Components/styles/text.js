// text
// - text that isn't within a backing container

// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fontSize } = styleVars;

// small text
// - footer on login screen
const SmallText = styled.div`
  font-size: ${fontSize.xSmall};
  color: ${colors.grey};
  p {
    margin-bottom: ${spacing.large};
  }
  a {
    display: inline-block;
    text-decoration: none;
    margin-right: ${spacing.xLarge};
    margin-bottom: ${spacing.large};
    cursor: pointer;
    transition: all ease-in-out 0.3s;
    border-bottom: 0.1rem solid;
    color: ${props => (props.loginStatus ? colors.blue : colors.pink)};
    &:hover {
      color: ${props =>
        props.loginStatus ? colors.lightBlue : colors.lightPink};
    }
    &:focus {
      color: ${colors.red};
    }
    &:nth-child(2) {
      margin-right: 0;
    }
  }
`;

// header when logged in
const SmallHeaderText = styled(SmallText)`
  p {
    text-align: center;
    @media screen and (min-width: 35rem) {
      text-align: right;
    }
  }
`;

// - - - - - - - - - - -
// header label
const HeaderLabel = styled.h1`
  line-height: 1;
  display: inline-block;
  margin-bottom: ${spacing.large};
  padding: ${spacing.med} ${spacing.large};
  border-radius: ${spacing.small};
  transform: skew(-10deg);
  background-color: white;
  color: ${props => (props.loginStatus ? colors.blue : colors.pink)};
  box-shadow: 0.15rem 0.15rem 0.3rem
    ${props => (props.loginStatus ? colors.blue : colors.pink)};
`;

// - - - - - - - - - - -
// repo stats
const Stats = styled.div`
  margin-bottom: ${spacing.xLarge};
  > div {
    margin-bottom: ${spacing.large};
  }
  > button {
    margin-right: ${spacing.xLarge};
  }
`;

export { SmallText, SmallHeaderText, HeaderLabel, Stats };
