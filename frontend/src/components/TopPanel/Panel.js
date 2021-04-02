import React from "react";
import styled from "styled-components/macro";
import ThemeToggle from "./ThemeToggler";

const TopPanelStyled = styled.header`
  width: 100%;
  background: var(--color-boxes);
`;

export function TopPanel(props) {
  return (
    <TopPanelStyled>
      <ThemeToggle />
      panel
    </TopPanelStyled>
  );
}
