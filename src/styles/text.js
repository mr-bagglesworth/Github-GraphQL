import styled from "styled-components";
import { colors, fontSize } from "./styleVars";

// small text
// - footer on login screen
const SmallText = styled.div`
  font-size: ${fontSize.xSmall};
  color: ${colors.grey};
  p {
    margin-bottom: 1rem;
  }
  a {
    display: inline-block;
    text-decoration: none;
    margin-right: 2rem;
    margin-bottom: 1rem;
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
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transform: skew(-10deg);
  background-color: white;
  color: ${props => (props.loginStatus ? colors.blue : colors.pink)};
  box-shadow: 0.15rem 0.15rem 0.3rem
    ${props => (props.loginStatus ? colors.blue : colors.pink)};
`;

// - - - - - - - - - - -
// repo stats
const Stats = styled.div`
  margin-bottom: 2rem;
  > div {
    margin-bottom: 1rem;
  }
  > button {
    margin-right: 2rem;
  }
`;

export { SmallText, SmallHeaderText, HeaderLabel, Stats };
