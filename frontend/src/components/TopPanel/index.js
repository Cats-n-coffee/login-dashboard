// eslint-disable-next-line
import styled, { css } from "styled-components/macro";
import * as React from "react";
import { THEME_MODE, useTheme } from "context/theme.context";
import { useAuth } from "../../context/auth.context";
import { ToggleButtonStyled } from "./toggleStyles";
import { MobileMenuIcon } from "./MobileMenu";
import { medium } from "../../styles/media-queries";
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
        padding: 0.6em 1em;
        font-size: 0.9rem;
      `}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default function TopPanel() {
  const [menuToggled, setMenuToggled] = React.useState(false);

  const toggleMenu = () => {
    setMenuToggled(!menuToggled);
  };
  return (
    <header
      css={`
        width: 100%;
        background: var(--color-boxes);
        position: relative;
        display: flex;
        justify-content: flex-end;
        padding: 0.7em;

        ${medium} {
          padding: 0.1em;
        }
      `}
    >
      <MobileMenuIcon onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </MobileMenuIcon>
      <div
        css={`
          display: none;
          position: absolute;
          top: 10vh;
          left: 0;
          right: 0;
          width: 70%;
          padding: 1em;
          margin: 0 auto;
          flex-direction: column;
          align-items: center;
          background: var(--color-boxes);
          border-radius: 6px;

          &.toggled {
            display: flex;
          }
          ${medium} {
            display: flex;
            position: static;
            margin: 0;
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
          }
        `}
        className={menuToggled ? "toggled" : null}
      >
        <ThemeToggle />
        panel
        <LogoutButton />
      </div>
    </header>
  );
}
