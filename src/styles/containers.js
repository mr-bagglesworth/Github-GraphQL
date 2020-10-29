import styled from "styled-components";
import { colors, fontSize, fontName } from "./styleVars";


const ThumbBase = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const Thumb = styled(ThumbBase)`
  a {
    width: 5rem;
    height: 5rem;
    border-radius: 2.5rem;
    border: 0.2rem solid ${colors.white};
    overflow: hidden;
    &:hover ~ p {
      display: block;
      padding: 0.125rem 0.25rem;
      border-radius: 0.125rem;
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
    top: -2rem;
    white-space: nowrap;
    pointer-events: none;
    font-size: ${fontSize.xSmall};
  }
`;

// 2.
// expand button is here rather than in buttons
const ThumbButton = styled(ThumbBase)`
  button {
    // resets
    border: 0;
    cursor: pointer;
    // styling
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 5rem;
    height: 5rem;
    border-radius: 2.5rem;
    padding: 0.5rem;
    font-family: ${fontName.main};
    font-size: ${fontSize.xSmall};
    transition: all ease-in-out 0.3s;
    background-color: ${colors.blue};
    color: ${colors.white};
    &:hover {
      background-color: ${colors.lightBlue};
    }
    &:focus {
      outline: none;
    }
    svg {
      fill: ${colors.white};
      margin-right: -0.5rem;
    }
  }
`;
export { Thumb, ThumbButton };
