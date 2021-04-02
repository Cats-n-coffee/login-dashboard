// eslint-disable-next-line
import styled from "styled-components/macro";
import * as React from "react";
import { THEME_MODE, useTheme } from "context/theme.context";

const { dark, light } = THEME_MODE;
function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const handleClick = () => {
    theme === dark ? setTheme(light) : setTheme(dark);
    return false;
  };

  return <button onClick={handleClick}>Switch theme</button>;
}

export default function TopPanel() {
  return (
    <header
      css={`
        width: 100%;
        background: var(--color-boxes);
      `}
    >
      <ThemeToggle />
      panel
    </header>
  );
}
