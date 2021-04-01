import { createGlobalStyle } from "styled-components";
import { colors } from "styles/colors";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    line-height: 1;
    box-sizing: border-box;
    transition: all .25s ease;
  }
  html {
    height: 100vh;
  }
  body {
    min-height: 100vh;
    font-weight:var(--font-normal);
    overflow-y: scroll;
    min-width: 280px;
    font-family: "Publuic Sans", Roboto,Helvetica Neue,sans-serif;
    font-weight: var(--font-normal);
    background-color: #edf3f8;
  }
  :root {
    --c00: ${colors.c00};
    --c01: ${colors.c01};
    --c10: ${colors.c10};
    --c11: ${colors.c11};
    --c12:${colors.c12};
    --c20:${colors.c20};
    --font-normal: 400;
    --font-bold: 700;
  }
  a,
  button,
  input,
  select,
  textarea,
  img {
    outline: none;
    border: none;
    appearance: none;
    outline: none
  }
  ul,li {
    list-style:none;
  }
  a,
  button,
  .button {
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  }
  h1,h2,h3,h4,h5,h6, strong {
    font-weight:var(--font-bolder);
    font-family:'DM Serif Display',  Roboto,Helvetica Neue,sans-serif;
  }
  img {
    max-width: 100%;
  }
  #root{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
  }
  #root main {
    flex-grow: 1;
  }
  #root footer {
    width: 100%;
    align-self: flex-end;
  }
  h1,h2,h3,h4,h5,h6,strong {
    color: var(--c10);
  }
  p {
    color: var(--c20);
  }
  ::-webkit-input-placeholder { /* Edge */
    color: var(--c10);
    text-transform: capitalize;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: var(--c10);
    text-transform: capitalize;
  }
  ::placeholder {
    color: var(--c10);
    text-transform: capitalize;
  }
`;

export default GlobalStyle;
