import React, { useState } from "react";
// eslint-disable-next-line
import styled from "styled-components";

const THEME_MODE = {
  light: "light",
  dark: "dark",
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState(THEME_MODE.light);

  const toggleTheme = (e) => {
    setTheme((theme) => {
      if (theme === THEME_MODE.light) {
        setTheme(THEME_MODE.dark);
      } else {
        setTheme(THEME_MODE.light);
      }
    });
    return false;
  };

  React.useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return <button onClick={toggleTheme}>Switch theme</button>;
}
