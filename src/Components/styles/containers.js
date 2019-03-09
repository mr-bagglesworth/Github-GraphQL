// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fontSize, fontWeight, boxShadow, border } = styleVars;

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
export { BasicRepo };

// .repo {
//   &-container {
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: space-between;
//     margin: 2rem 0;
//     padding: 1rem 0;
//   }
//   &-item {
//     background-color: $white;
//     display: block;
//     width: 100%;
//     margin-bottom: 2rem;
//     @media screen and (min-width: 40rem) {
//       width: 45%;
//       margin-right: 10%;
//       &:nth-child(even) {
//         margin-right: 0;
//       }
//     }
//     overflow: hidden;
// border-radius: 0.25rem;
// box-shadow: $shadow-out;
//   }
//   // image
//   &-header {
//     overflow: hidden;
//     max-height: 15rem;
//     border-bottom: $border-black;
//     position: relative;
//     img {
//       width: 100%;
//     }
//     .rank {
//       position: absolute;
//       top: 0;
//       left: 0;
//       background-color: $black;
//       color: $white;
//       height: 2.5rem;
//       padding: 0.5rem;
//       border-bottom-right-radius: 0.25rem;
//     }
//   }
//   // content
//   &-content {
//     padding: 1rem;
//     display: flex;
//     flex-direction: column;
//     p {
//       margin-top: 0.5rem;
//       color: $grey;
//       font-size: $font-xSmall;
//     }
//     button {
//       margin-top: 1rem;
//       align-self: flex-end;
//     }
//   }
// }