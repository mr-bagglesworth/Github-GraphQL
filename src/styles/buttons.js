import styled from "styled-components";
import { colors, fontName, fontSize } from "./styleVars";

// input type = text
// - takes login prop
const Button = styled.input`
  cursor: pointer;
  font-family: ${fontName.main};
  font-size: ${fontSize.small};
  padding: 0.5rem 1rem;
  border: 0;
  border-radius: 0.25rem;
  transition: all ease-in-out 0.3s;
  color: ${colors.white};
  background-color: ${props => (props.loginStatus ? colors.blue : colors.pink)};
  &:hover,
  &:focus {
    outline: none;
    background-color: ${props =>
      props.loginStatus ? colors.lightBlue : colors.lightPink};
  }
  @media screen and (min-width: 35rem) {
    font-size: ${fontSize.med};
  }
`;

// button that looks like text
// - in header
const TextButton = styled.button`
  cursor: pointer;
  font-family: ${fontName.main};
  font-size: ${fontSize.xSmall};
  padding: 0;
  margin-left: 0.5rem;
  background-color: transparent;
  border: 0;
  transition: all ease-in-out 0.3s;
  color: ${colors.blue};
  border-bottom: 0.1rem solid;
  &:hover {
    color: ${colors.lightBlue};
  }
  &:focus {
    color: ${colors.red};
  }
`;

// button
// - used for search toggle
const ToggleButton = styled.button`
  cursor: pointer;
  font-family: ${fontName.main};
  font-size: ${fontSize.small};
  padding: 0.5rem 1rem;
  background-color: ${props =>
    props.isActive ? colors.lightBlue : colors.grey};
  color: ${colors.white};
  border: 0;
  border-radius: 0.25rem;
  transition: all ease-in-out 0.3s;
  &:hover,
  &:focus {
    outline: none;
    background-color: ${props =>
      props.isActive ? colors.blue : colors.darkGrey};
  }
`;

// user profile expand button
// expanded : not expanded
const ExpandButton = styled.button`
  cursor: pointer;
  font-family: ${fontName.main};
  font-size: ${fontSize.small};
  padding: 0.5rem 1rem;
  background-color: ${props => (props.expanded ? colors.blue : colors.white)};
  color: ${props => (props.expanded ? colors.white : colors.blue)};
  border: 0.2rem solid ${colors.blue};
  border-radius: 0.25rem;
  transition: all ease-in-out 0.3s;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${props =>
      props.expanded ? colors.lightBlue : colors.blue};
    border-color: ${props => (props.expanded ? colors.lightBlue : colors.blue)};
    color: ${props => (props.expanded ? colors.white : colors.white)};
  }
`;

// user repos arrow button
// - make a different view to show LargeRepo card
// - contains an svg
// - make arrow left as well
// - add disabled attr for expanded
const ArrowButton = styled.button`
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: 0;
  transition: all ease-in-out 0.3s;

  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  color: ${colors.darkGrey};
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: ${colors.off_white};
  }
`;

export { Button, TextButton, ToggleButton, ExpandButton, ArrowButton };
