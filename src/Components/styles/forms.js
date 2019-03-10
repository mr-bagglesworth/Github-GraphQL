// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fontName, fontSize, boxShadow } = styleVars;

// all form elements, including buttons

const BasicForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: ${spacing.xLarge} 0;
  padding: ${spacing.large};
  background-color: ${colors.lightGrey};
  border-radius: ${spacing.small};
  box-shadow: ${boxShadow.out};
  // rows
  > div:nth-child(1) {
    display: flex;
    flex-direction: column;
    margin-bottom: ${spacing.large};
  }
  > div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    label[for="userdetails"] {
      margin-left: 0;
    }
    // radio button container
    > div:nth-child(1) {
      display: flex;
    }
  }
  input[type="text"] {
    font-family: ${fontName.main};
    font-size: ${fontSize.small};
    padding: ${spacing.med};
    border: 0.2rem solid ${colors.grey};
    border-radius: ${spacing.small};
    &:focus {
      outline: none;
      border: 0.2rem solid ${colors.blue};
    }
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

const FormButton = styled.input`
  cursor: pointer;
  font-family: ${fontName.main};
  font-size: ${fontSize.med};
  padding: ${spacing.med} ${spacing.large};
  background-color: ${colors.blue};
  color: ${colors.white};
  border: 0;
  border-radius: ${spacing.small};
  transition: all ease-in-out 0.3s;
  &:hover,
  &:focus {
    outline: none;
    background-color: ${colors.lightBlue};
  }
`;

export { BasicForm, CustomRadio, FormButton };
