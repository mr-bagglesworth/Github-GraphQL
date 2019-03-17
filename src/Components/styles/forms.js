// forms
// - form containers, text input, and radios
// - not including buttons

import styled from "styled-components";
import styleVars from "./styleVars";
const { colors, spacing, fontName, fontSize, boxShadow } = styleVars;

// all forms contain inputs wrapped in divs
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: ${spacing.xLarge} 0;
  padding: ${spacing.large};
  background-color: ${colors.lightGrey};
  border-radius: ${spacing.small};
  box-shadow: ${boxShadow.out};
  // rows
  > div {
    display: flex;
    flex-direction: column;
    margin-top: ${spacing.large};
  }
  > div:nth-child(1) {
    margin-top: 0;
  }
`;

// search form
const SearchForm = styled(Form)`
  // radio and submit container
  > div:nth-child(2) {
    flex-direction: column;
    justify-content: space-between;
    // wrap at wider widths
    @media screen and (min-width: 40rem) {
      flex-direction: row;
      align-items: center;
    }
    // radio container
    > div:nth-child(1) {
      display: flex;
      flex-direction: column;
      margin-bottom: ${spacing.large};
      @media screen and (min-width: 30rem) {
        flex-direction: row;
      }
      @media screen and (min-width: 40rem) {
        margin-bottom: 0;
      }
    }
    // submit container
    > div:nth-child(2) {
      align-self: flex-end;
    }
  }
  // labels on radios
  label {
    margin-left: 0;
    margin-bottom: ${spacing.med};
    @media screen and (min-width: 30rem) {
      &[for="repodetails"] {
        margin-left: ${spacing.large};
        margin-bottom: 0;
      }
    }
  }
`;

// login form
const LoginForm = styled(Form)`
  // submit container
  > div:nth-child(3) {
    align-self: flex-end;
  }
`;

// text and password input
// - div containing label and input
const TextInput = styled.input`
  font-family: ${fontName.main};
  font-size: ${fontSize.small};
  padding: ${spacing.med};
  border: 0.2rem solid ${colors.grey};
  border-radius: ${spacing.small};
  &:focus {
    outline: none;
    background-color: ${props =>
      props.loginStatus
        ? colors.paleBlue
        : colors.palePink} !important; // override user agent stylesheet
    border: 0.2rem solid
      ${props => (props.loginStatus ? colors.blue : colors.pink)};
  }
`;

// radio inputs
const CustomRadio = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  height: ${spacing.xLarge};
  padding-left: 2.5rem;
  margin-left: ${spacing.large};
  cursor: pointer;
  user-select: none;
  // default radio input
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    &:checked ~ span {
      background-color: ${colors.blue};
      &:after {
        display: block;
      }
    }
  }
  // hover state
  &:hover input ~ span {
    background-color: ${colors.grey};
  }
  // new custom input
  span {
    position: absolute;
    top: 0;
    left: 0;
    height: ${spacing.xLarge};
    width: ${spacing.xLarge};
    border-radius: 50%;
    background-color: ${colors.midGrey};
    &:after {
      content: "";
      position: absolute;
      display: none;
      top: 25%;
      left: 25%;
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background: white;
    }
  }
`;

export { Form, SearchForm, LoginForm, TextInput, CustomRadio };
