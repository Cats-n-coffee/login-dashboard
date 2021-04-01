import * as React from "react";
import AuthForm from "components/AuthForm";
import { useAuth } from "context/auth.context";
import { Card } from "../styles/styles";
import styled, { css } from "styled-components/macro";
import ToggleTheme from "../components/ThemeToggle";

export default function LoginScreen() {
  React.useEffect(() => {
    document.title = "Login";
    return () => (document.title = "Dashboard");
  }, []);
  const { login } = useAuth();
  const handleSubmit = (values) => {
    login(values);
  };
  return (
    <div
      css={`
        ${Card}
      `}
    >
      <ToggleTheme />
      <h1>Login</h1>
      <AuthForm type="login" onSubmit={handleSubmit} />
    </div>
  );
}
