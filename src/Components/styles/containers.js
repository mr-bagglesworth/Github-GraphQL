// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fontSize, boxShadow, border } = styleVars;

// 1. universal
// 2. users
// 3. repos

// - - - - - - - - - - -
// 1.
// user thumbnail
const Thumb = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.large};
  margin-bottom: ${spacing.large};
  a {
    width: ${spacing.xxLarge};
    height: ${spacing.xxLarge};
    border-radius: 2.5rem;
    border: 0.2rem solid ${colors.white};
    overflow: hidden;
    &:hover ~ p {
      display: block;
      padding: ${spacing.xSmall} ${spacing.small};
      border-radius: ${spacing.xSmall};
      background-color: ${colors.blue};
      color: ${colors.white};
    }
    &:hover {
      border: 0.2rem solid ${colors.blue};
    }
  }
  img {
    width: 100%;
    height: auto;
  }
  p {
    display: none;
    position: absolute;
    left: 0;
    top: -${spacing.xLarge};
    white-space: nowrap;
    pointer-events: none;
    font-size: ${fontSize.xSmall};
  }
`;

// - - - - - - - - - - -
// 2.
const User = styled.div`
  // outer container
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 40rem) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  width: 100%;
  overflow: hidden;
  border-radius: ${spacing.small};
  box-shadow: ${boxShadow.out};
  // image header
  .user-header {
    position: relative;
    overflow: hidden;
    max-height: 18.25rem;
    border-bottom: ${border.black};
    @media screen and (min-width: 40rem) {
      max-width: 15rem;
      border-bottom: 0;
      border-right: ${border.black};
    }
    img {
      width: 100%;
      display: inherit;
      @media screen and (min-width: 40rem) {
        width: auto;
        height: 100%;
      }
    }
  }

  // content section
  .user-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: ${spacing.large};
    @media screen and (min-width: 40rem) {
      width: calc(100% - 15rem);
    }
    h2 a {
      font-size: ${fontSize.large};
      text-decoration: none;
      color: ${colors.black};
      &:hover {
        color: ${colors.blue};
      }
    }
    p {
      margin-top: ${spacing.med};
      color: ${colors.grey};
      font-size: $font-xSmall;
    }
    // button container
    .user-button {
      display: flex;
      justify-content: flex-end;
      margin-top: ${spacing.large};
      @media screen and (min-width: 40rem) {
        margin-top: 0;
      }
    }
  }

  // extra section
  .user-extra {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: ${spacing.large};
    h3 {
      font-size: ${fontSize.med};
      margin-bottom: ${spacing.med};
    }
    ul {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

// - - - - - - - - - - -
// 3.
// simple repo with coloured border at the top
const Repo = styled.li`
  margin-bottom: ${spacing.xLarge};
  padding: ${spacing.large};
  background-color: ${colors.white};
  box-shadow: ${boxShadow.out};
  border-radius: ${spacing.small};
  // language colours
  border-top: ${spacing.large} solid
    ${props => (props.langColor ? props.langColor : "white")};
  .language {
    padding: ${spacing.xSmall} ${spacing.small};
    background-color: ${props =>
      props.langColor ? props.langColor : colors.grey};
    color: ${props =>
      props.langName === "JavaScript" ? colors.black : colors.white};
  }
`;

// - - - - - - - - - - -
// - - - - - - - - - - -
// - - - - - - - - - - -
// - - - - - - - - - - -
// - - - - - - - - - - -
// not basic repo though
// - basic repo will be one column, and will not change depending upon size
// - think verkstedt tech test
const BasicRepo = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${spacing.xLarge} 0;
  background-color: ${colors.white};
  border-bottom: ${spacing.med} solid
    ${props => (props.color ? props.color : "white")};
  border-radius: ${spacing.small};
  box-shadow: ${boxShadow.out};
  @media screen and (min-width: 35rem) {
    flex-direction: row;
    border-bottom: 0;
    border-right: ${spacing.med} solid
      ${props => (props.color ? props.color : "white")};
  }
  // image container
  > div {
    overflow: hidden;
    position: relative;
    min-height: 20rem;
    border-bottom: ${border.black};
    border-top-right-radius: ${spacing.small};
    border-top-left-radius: ${spacing.small};
    @media screen and (min-width: 35rem) {
      min-height: auto;
      width: 17.5rem;
      border-right: ${border.black};
      border-bottom: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: ${spacing.small};
    }
    // image
    img {
      position: absolute;
      top: -25%;
      width: 100%;
      @media screen and (min-width: 35rem) {
        width: auto;
        height: 100%;
        top: auto;
      }
    }
  }
  // content
  > ul {
    padding: ${spacing.large};
  }
  .dot {
    display: inline-block;
    margin-left: ${spacing.med};
    width: ${spacing.large};
    height: ${spacing.large};
    vertical-align: middle;
    border-radius: ${spacing.med};
    background-color: ${props => (props.color ? props.color : "white")};
  }
`;

export { Thumb, Repo, User, BasicRepo };
