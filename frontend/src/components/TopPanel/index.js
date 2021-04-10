// eslint-disable-next-line
import styled, { css } from "styled-components/macro";
import * as React from "react";
import { THEME_MODE, useTheme } from "context/theme.context";
import { ToggleButtonStyled, ToggleWrapper, ToggleSvg } from "./toggleStyles";
import { MobileMenuIcon } from "./MobileMenu";
import { medium } from "../../styles/media-queries";
import { useLogout } from "../../utils/auth.hooks";
import { Moon, Sun } from "../Icons";

const { dark, light } = THEME_MODE;

function ThemeToggle() {
  const [theme, setTheme] = useTheme();

  const handleClick = () => {
    theme === dark ? setTheme(light) : setTheme(dark);
    return false;
  };

  return (
    <div
      css={`
        ${ToggleWrapper}
      `}
    >
      <Moon
        css={`
          width: 12px;
          height: 12px;
          margin: 0 5px 0 0;
          ${ToggleSvg}
        `}
      />
      <ToggleButtonStyled
        onClick={handleClick}
        className={theme === light ? "toggle" : null}
      ></ToggleButtonStyled>
      <Sun
        css={`
          width: 20px;
          height: 19px;
          margin: 0 0 0 5px;
          ${ToggleSvg}
        `}
      />
    </div>
  );
}

function DateComponent() {
  const todayDate = Date.now();
  const newDate = new Date(todayDate);
  const readableDate = newDate.toDateString();

  return (
    <div
      css={`
        color: var(--color-titles);
        font-family: var(--font-family);
      `}
    >
      {readableDate}
    </div>
  );
}

function LogoutButton() {
  const [color, setColor] = React.useState("var(--color-background)");
  const { mutate } = useLogout();

  const handleLogout = (data) => {
    mutate(data);
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

  React.useEffect(() => {
    if (menuToggled) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [menuToggled]);
  return (
    <header
      css={`
        width: 100%;
        background: var(--color-boxes);
        position: relative;
        display: flex;
        justify-content: flex-end;
        padding: 0.7em;
        z-index: 1;

        ${medium} {
          padding: 5px;
        }
      `}
    >
      <div
        css={`
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100vw;
          height: 100vh;
          z-index: 2;
          background: var(--color-mobile-blur);
          display: none;

          &.toggled {
            display: block;
          }
        `}
        className={menuToggled ? "toggled" : null}
      ></div>
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
          height: 25vh;
          padding: 1.5em;
          margin: 0 auto;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          background: var(--color-boxes);
          border-radius: 6px;
          z-index: 3;

          &.toggled {
            display: flex;
          }
          ${medium} {
            display: flex;
            position: static;
            margin: 0;
            width: 100%;
            height: auto;
            flex-direction: row;
            justify-content: space-between;
            padding: 0;
          }
        `}
        className={menuToggled ? "toggled" : null}
      >
        <ThemeToggle />
        <DateComponent />
        <LogoutButton />
      </div>
    </header>
  );
}
