// buttons
// - including form input[type=submit], and buttons that look like text
// - props colour the buttons

import styled from "styled-components";
import styleVars from "./styleVars";
const { colors, spacing, fontName, fontSize } = styleVars;

// input type = text
// - takes login prop
const Button = styled.input`
  cursor: pointer;
  font-family: ${fontName.main};
  font-size: ${fontSize.small};
  padding: ${spacing.med} ${spacing.large};
  border: 0;
  border-radius: ${spacing.small};
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

// button
// - used for search toggle
const SmallButton = styled.button`
  cursor: pointer;
  font-family: ${fontName.main};
  font-size: ${fontSize.xSmall};
  padding: ${spacing.small} ${spacing.med};
  background-color: ${colors.red};
  color: ${colors.white};
  border: 0;
  border-radius: ${spacing.small};
  transition: all ease-in-out 0.3s;
  &:hover,
  &:focus {
    outline: none;
    background-color: ${colors.darkRed};
  }
`;

// button that looks like text
// - in header
const TextButton = styled.button`
  cursor: pointer;
  font-family: ${fontName.main};
  font-size: ${fontSize.xSmall};
  padding: 0;
  margin-left: ${spacing.med};
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

export { Button, SmallButton, TextButton };
