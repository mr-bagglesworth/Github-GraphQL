// get variables
import styled from "styled-components";
import styleVars from "./styleVars";

const { colors, spacing, fontSize } = styleVars;

// universal containers
// - used by both user search, repo search, and anything else

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

export { Thumb };
