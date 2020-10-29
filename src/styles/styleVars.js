import { css } from 'styled-components';

const border = {
  black: "0.1rem solid black",
  grey: "0.1rem solid grey",
};

const boxShadow = {
  out: "-0.125rem 0.25rem 0.35rem rgba(0,0,0,0.15)", // -0.125rem 0.25rem 1.5rem rgba(0, 0, 0, 0.25)
  in: "-0.125rem 0.25rem 1.5rem inset rgba(0, 0, 0, 0.25)",
};

const colors = {
  black: "black",
  white: "white",
  // greys
  off_white: "#eee",
  lightGrey: "#f7f7f7",
  midGrey: "#d8d8d8",
  grey: "grey",
  darkGrey: "dimgrey",
  // blues
  blue: "#0348a3",
  lightBlue: "#0469ee",
  bgBlue: "#aaf5ff",
  paleBlue: "#eefdff",
  // reds
  red: "tomato",
  darkRed: "#d9391c",
  yellow: "#fcbc00",
  // pinks
  pink: "#c91f6c",
  lightPink: "#e13ab0",
  bgPink: "#eb7caf",
  palePink: "#fbe4ef",
};

const fontName = {
  main: '"Signika Negative", sans-serif',
};

const fontSize = {
  xxSmall: "0.95rem",
  xSmall: "1.125rem",
  small: "1.25rem",
  med: "1.525rem",
  large: "1.875rem",
  xLarge: "2.5rem",
};

const fontWeight = {
  light: "400",
  med: "600",
};

const gradient = (bg) => css`
  linear-gradient(215deg, ${bg}, rgba(255, 255, 255, 0.65)), linear-gradient(65deg, ${bg}, rgba(255, 255, 255, 0.35))
`;


// // slide out transition
// const transformTop = cookieHeight => keyframes`
//   0% {
//     transform: translateY(0);
//   }
//   100% {
//     transform: ${`translateY(-${cookieHeight}px)`};
//   }
// `;

// // wrap document
// // - adds slide out transition
// const DomWrapper = styled.div`
//   display: ${props => (!props.hideCookies ? `block` : `contents`)};
//   padding-top: ${props => props.initialCookieHeight || 0}px;
//   animation: ${props =>
//     props.hideCookies &&
//     css`
//       ${transformTop(props.cookieHeight)} ${duration}s ease-in-out 0s forwards
//     `};
// `;


export { border, boxShadow, colors, fontName, fontSize, fontWeight, gradient };
