// to place the ensential components
import styled from "styled-components";
import * as mediaQueries from "styles/media-queries";

export const Error = styled.div`
  color: red;
  &:empty {
    display: none;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1110px;
  margin-left: auto;
  margin-right: auto;
  // based on mobile version design guide
  padding-left: calc(12px + 3.2vw);
  padding-right: calc(12px + 3.2vw);
  //based on tablet, ipad version
  ${mediaQueries.medium} {
    padding-left: 0;
    padding-right: 0;
    width: 89.5%;
  }
  ${mediaQueries.large} {
    width: 79.08%;
  }
`;

export const Button = styled("button").attrs(() => ({ className: "btn" }))`
  text-align: center;
  border-radius: 6px;
  text-transform: uppercase;
  background: var(--color-titles);
  color: var(--color-boxes);
  width: 100%;
  padding: 0.8em;
  font-size: 1.2em;
  letter-spacing: 0.1rem;
  margin: 1em 0 0 0;
`;
