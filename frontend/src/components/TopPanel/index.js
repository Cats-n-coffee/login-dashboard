// eslint-disable-next-line
import styled, { css } from "styled-components/macro";
import * as React from "react";
import { THEME_MODE, useTheme } from "context/theme.context";
import { useAuth } from "../../context/auth.context";
import { ToggleButtonStyled } from "./toggleStyles";
//import { Moon, Sun } from "../Icons";

const { dark, light } = THEME_MODE;

function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  const handleClick = () => {
    theme === dark ? setTheme(light) : setTheme(dark);
    return false;
  };

  return (
    <>
      {/* <Moon /> */}
      <ToggleButtonStyled
        onClick={handleClick}
        className={theme === light ? "toggle" : null}
      ></ToggleButtonStyled>
      {/* <Sun /> */}
    </>
  );
}

function LogoutButton() {
  const [color, setColor] = React.useState("var(--color-background)");
  const { logout } = useAuth();

  const handleLogout = (e) => {
    logout();
    setColor("var(--color-background-auth)");
  };

  React.useEffect(() => {
    document.body.style.background = color;
  }, [color]);

  return (
    <button
      css={`
        border-radius: 6px;
        text-transform: uppercase;
        background: var(--color-titles);
        color: var(--color-boxes);
        letter-spacing: 0.1rem;
        padding: 0.8em 1.3em;
        font-size: 1rem;
      `}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
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
      <LogoutButton />
    </header>
  );
}
