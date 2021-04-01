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
  
  body[data-theme="light"] {
    --color-text: var(--c00);
    --color-boxes: var(--white);
    --color-input: var(--c20);
    --background-dash: var(--c10);
    --background-auth: var(--g01);
  }
  body[data-theme="dark"] {
    --color-text: var(--c02);
    --color-boxes: var(--c20);
    --color-input: var(--c10);
    --background-dash: var(--c21);
    --background-auth: var(--g02);
  }
  body {
    min-height: 100vh;
    font-weight:var(--font-normal);
    overflow-y: scroll;
    min-width: 280px;
    font-family: var(--font-family);
    font-weight: var(--font-normal);
    background: var(--background-auth);
  }
  :root {
    --c00: ${colors.c00};
    --c01: ${colors.c01};
    --c02: ${colors.c02};
    --c10: ${colors.c10};
    --c11:${colors.c11};
    --c20:${colors.c20};
    --c21:${colors.c21};
    --g01: linear-gradient(to bottom, ${colors.cg01}, ${colors.cg02});
    --g02: linear-gradient(to bottom, ${colors.cg03}, ${colors.cg04});
    --white: ${colors.white};
    --font-normal: 400;
    --font-bold: 700;
    --font-family: "Publuic Sans", Roboto,Helvetica Neue,sans-serif;
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
    font-family: var(--font-family);
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
