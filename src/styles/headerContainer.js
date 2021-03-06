import styled from "styled-components";
import { colors, fontSize, boxShadow, border } from "./styleVars";

// outer container
const Container = styled.div`
  // top margin - large repo offset
  margin-top: ${props => (props.offSet ? `${props.offSet}px` : 0)};
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
  border-radius: 0.25rem;
  box-shadow: ${boxShadow.out};
`;

// image header
const Header = styled.header`
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
`;

// content
const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1rem;
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
  h3 {
    font-size: ${fontSize.large};
  }
  p {
    margin-top: 0.5rem;
    color: ${colors.grey};
    font-size: $font-xSmall;
  }
`;

// button
const Button = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  @media screen and (min-width: 40rem) {
    margin-top: 0;
  }
`;

// extra
// - default content area for LargeRepo.js
const Extra = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  padding: 1rem;
  h2 {
    font-size: ${fontSize.large};
  }
  h3 {
    font-size: ${fontSize.med};
  }
  h3,
  h4 {
    margin-bottom: 0.5rem;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
  }
`;
export { Container, Header, Content, Button, Extra };
