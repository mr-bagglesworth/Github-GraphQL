import styled from "styled-components";
import { colors, fontName, fontSize, boxShadow } from "./styleVars";

// all forms contain inputs wrapped in divs
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
  padding: 1rem;
  background-color: ${colors.lightGrey};
  border-radius: 0.25rem;
  box-shadow: ${boxShadow.out};
  // rows
  > div {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
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
      margin-bottom: 1rem;
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
    margin-bottom: 0.5rem;
    @media screen and (min-width: 30rem) {
      &[for="repodetails"] {
        margin-left: 1rem;
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
  padding: 0.5rem;
  border: 0.2rem solid ${colors.grey};
  border-radius: 0.25rem;
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
  height: 2rem;
  padding-left: 2.5rem;
  margin-left: 1rem;
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
    height: 2rem;
    width: 2rem;
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
