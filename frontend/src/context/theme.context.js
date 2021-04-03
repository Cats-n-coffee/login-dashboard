import React, { useState, useEffect } from "react";

const ThemeContext = React.createContext();

export const THEME_MODE = { light: "light", dark: "dark" };

export function ThemeProvider(props) {
  const [theme, setTheme] = useState(() => {
    try {
      return window.localStorage.getItem("theme") || THEME_MODE.dark;
    } catch (err) {
      return THEME_MODE.dark;
    }
  });

  useEffect(() => {
    window.localStorage.setItem("theme", theme);
    document.body.dataset.theme = theme;
  }, [theme]);

  const value = [theme, setTheme];

  return <ThemeContext.Provider value={value} {...props} />;
}

export function useTheme() {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error(`Using useTheme outside of <ThemeProvider />`);
  }
  return context;
}
