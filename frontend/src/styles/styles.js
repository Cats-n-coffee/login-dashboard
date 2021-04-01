// to place shared css styles
import { css } from "styled-components";

export const Card = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2.3em 2em;
  background: var(--color-boxes);
  border-radius: 6px;
  max-height: 70vh;
  height: auto;
  width: 100%;
  max-width: 400px;

  h1 {
    color: var(--color-text);
    padding: 0 0 2rem 0;
  }
`;
