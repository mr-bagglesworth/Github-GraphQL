// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fontSize, boxShadow } = styleVars;
// , border

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
  border-top: ${spacing.large} solid
    ${props => (props.langColor ? props.langColor : "white")};
  .language {
    padding: ${spacing.xSmall} ${spacing.small};
    background-color: ${props =>
      props.langColor ? props.langColor : colors.grey};
    color: ${props =>
      props.langName === "JavaScript" ? colors.black : colors.white};
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

// 2. more detailed repo with a thumbnail at the top
// const RepoDetail = styled(RepoBase)`
//   margin-left: ${spacing.xLarge};
//   @media screen and (min-width: 35rem) {
//     flex-direction: row;
//   }
//   // padding: ${spacing.large};
// `;

// 3. thumbnail header - goes in RepoDetail
// const RepoHeader = styled.header`
//   overflow: hidden;
//   position: relative;
//   min-height: 20rem;
//   border-bottom: ${border.black};
//   border-top-right-radius: ${spacing.small};
//   border-top-left-radius: ${spacing.small};
//   @media screen and (min-width: 35rem) {
//     min-height: auto;
//     width: 17.5rem;
//     border-right: ${border.black};
//     border-bottom: 0;
//     border-top-right-radius: 0;
//     border-bottom-left-radius: ${spacing.small};
//   }
//   // image
//   img {
//     position: absolute;
//     top: -25%;
//     width: 100%;
//     @media screen and (min-width: 35rem) {
//       width: auto;
//       height: 100%;
//       top: auto;
//     }
//   }
// `;

// - - - - - - - - - - -
// - - - - - - - - - - -
// - - - - - - - - - - -
// - - - - - - - - - - -
// - - - - - - - - - - -
// not basic repo though
// - basic repo will be one column, and will not change depending upon size
// - think verkstedt tech test
// const BasicRepo = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: ${spacing.xLarge} 0;
//   background-color: ${colors.white};
//   border-bottom: ${spacing.med} solid
//     ${props => (props.color ? props.color : "white")};
//   border-radius: ${spacing.small};
//   box-shadow: ${boxShadow.out};
// @media screen and (min-width: 35rem) {
//   flex-direction: row;
//   border-bottom: 0;
//   border-right: ${spacing.med} solid
//     ${props => (props.color ? props.color : "white")};
// }
//   // image container
// > div {
//   overflow: hidden;
//   position: relative;
//   min-height: 20rem;
//   border-bottom: ${border.black};
//   border-top-right-radius: ${spacing.small};
//   border-top-left-radius: ${spacing.small};
//   @media screen and (min-width: 35rem) {
//     min-height: auto;
//     width: 17.5rem;
//     border-right: ${border.black};
//     border-bottom: 0;
//     border-top-right-radius: 0;
//     border-bottom-left-radius: ${spacing.small};
//   }
//   // image
//   img {
//     position: absolute;
//     top: -25%;
//     width: 100%;
//     @media screen and (min-width: 35rem) {
//       width: auto;
//       height: 100%;
//       top: auto;
//     }
//   }
// }
//   // content
//   > ul {
//     padding: ${spacing.large};
//   }
//   .dot {
//     display: inline-block;
//     margin-left: ${spacing.med};
//     width: ${spacing.large};
//     height: ${spacing.large};
//     vertical-align: middle;
//     border-radius: ${spacing.med};
//     background-color: ${props => (props.color ? props.color : "white")};
//   }
// `;

export { RepoContainer, Repo };
// , RepoDetail, RepoHeader
