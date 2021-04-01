// to place shared css styles
import { css } from "styled-components";

export const FormWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  background: var(--color-boxes);
  padding: 2.3em 2em;
  width: 100%;
  max-width: 400px;
  height: auto;
  max-height: 70vh;

  h1 {
    color: var(--color-titles);
    padding: 0 0 2rem 0;
  }
`;
