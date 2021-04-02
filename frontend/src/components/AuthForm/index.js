// eslint-disable-next-line
import styled from "styled-components/macro";
import * as React from "react";
import { Button } from "components/lib";
import PropTypes from "prop-types";
import Field from "components/Field";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { initialValues, AuthSchema } from "./auth.helper";
import { Wrapper, RedirectWrap, ErrorWrap } from "./styles";

function AuthForm({ onSubmit, type }) {
  return (
    <Wrapper>
      <h1>{type === "login" ? "Login" : "Sign up"}</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={AuthSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {type === "login" ? null : (
              <Field
                label="User Name"
                name="username"
                type="text"
                placeholder="username"
              />
            )}
            <Field label="Email" name="email" type="text" placeholder="email" />
            <Field
              label="Password"
              name="password"
              type="password"
              placeholder="Password"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? type === "register"
                  ? "registering"
                  : "logining"
                : type}
            </Button>
          </Form>
        )}
      </Formik>
      <ErrorWrap></ErrorWrap>
      <RedirectWrap>
        {type === "login" ? (
          <>
            Don't have an account?&nbsp;
            <Link to="/register">Sign Up</Link>
          </>
        ) : (
          <>
            Already have an account?&nbsp;
            <Link to="/login">Login</Link>
          </>
        )}
      </RedirectWrap>
    </Wrapper>
  );
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["login", "register"]).isRequired,
};
export default AuthForm;
