// eslint-disable-next-line
import styled from "styled-components/macro";
import * as React from "react";
import AuthForm from "components/AuthForm";
import { useAuth } from "context/auth.context";
import { FormWrapper, ChangeLoginToRegister } from "styles/styles";

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
        ${FormWrapper}
      `}
    >
      <h1>Sign Up</h1>
      <AuthForm type="register" onSubmit={handleSubmit} />
      <div
        css={`
          ${ChangeLoginToRegister}
        `}
      >
        Already have an account?
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
