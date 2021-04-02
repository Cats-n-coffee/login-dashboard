// eslint-disable-next-line
import styled from "styled-components";
import React from "react";
import { THEME_MODE, useTheme } from "../../../context/theme.context";

export default function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const { dark, light } = THEME_MODE;

  const toggleTheme = () => {
    theme === dark ? setTheme(light) : setTheme(dark);
    return false;
  };

  return <button onClick={toggleTheme}>Switch theme</button>;
}
