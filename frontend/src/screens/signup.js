import * as React from "react";
import AuthForm from "components/AuthForm";
import { useAuth } from "context/auth.context";
import { Card } from "../styles/styles";
import styled, { css } from "styled-components/macro";
import ToggleTheme from "../components/ThemeToggle";

export default function SignUpScreen() {
  React.useEffect(() => {
    document.title = "Sign Up";
    return () => (document.title = "Dashboard");
  }, []);
  const { register } = useAuth();
  const handleSubmit = (values) => {
    register(values);
  };
  return (
    <div
      css={`
        ${Card}
      `}
    >
      <ToggleTheme />
      <h1>Sign Up</h1>
      <AuthForm type="register" onSubmit={handleSubmit} />
    </div>
  );
}
