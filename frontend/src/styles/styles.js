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

  h1 {
    color: var(--color-titles);
  }
`;
