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
  /* height: 3rem; */
  text-align: center;
  /* min-width: 4rem; */
  border-radius: 6px;
  text-transform: uppercase;
  font-size: 1.2rem;
  letter-spacing: 0.1rem;
  padding: 0.8em;
  width: 100%;
  color: var(--color-boxes);
  background: var(--color-text);
`;
