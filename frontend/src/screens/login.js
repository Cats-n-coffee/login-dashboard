// eslint-disable-next-line
import styled, { css } from "styled-components/macro";
import * as React from "react";
import AuthForm from "components/AuthForm";
import { useAuth } from "context/auth.context";
import { FormWrapper, ChangeLoginToRegister } from "../styles/styles";

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
        ${FormWrapper}
      `}
    >
      <h1>Login</h1>
      <AuthForm type="login" onSubmit={handleSubmit} />
      <div
        css={`
          ${ChangeLoginToRegister}
        `}
      >
        Don't have an account?
        <a href="/register">Sign Up</a>
      </div>
    </div>
  );
}
