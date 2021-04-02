// eslint-disable-next-line
import styled from "styled-components/macro";
import * as React from "react";
import { THEME_MODE, useTheme } from "context/theme.context";
import { useAuth } from "../../context/auth.context";

const { dark, light } = THEME_MODE;

function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const handleClick = () => {
    theme === dark ? setTheme(light) : setTheme(dark);
    return false;
  };

  return <button onClick={handleClick}>Switch theme</button>;
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

  return <button onClick={handleLogout}>Logout</button>;
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
