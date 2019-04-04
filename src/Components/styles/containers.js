// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fontSize, fontName } = styleVars;

// universal containers
// - used by both user search, repo search, and anything else

const ThumbBase = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: ${spacing.large};
  margin-bottom: ${spacing.large};
`;

// 1.
// user thumbnail
const Thumb = styled(ThumbBase)`
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
    width: ${spacing.xxLarge};
    height: ${spacing.xxLarge};
    border-radius: 2.5rem;
    padding: ${spacing.med};
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
      margin-right: -${spacing.med};
    }
  }
`;
export { Thumb, ThumbButton };
