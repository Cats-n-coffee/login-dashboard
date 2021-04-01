// eslint-disable-next-line
import styled from "styled-components/macro";
import * as React from "react";
import { Button } from "components/lib";
import PropTypes from "prop-types";
import Field from "components/Field";
import { Formik, Form } from "formik";
import { initialValues, AuthSchema } from "./auth.helper";

function AuthForm({ onSubmit, type }) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AuthSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, ...props }) => (
        <Form
          css={`
            width: 100%;
          `}
        >
          {type === "login" ? null : (
            <Field
              label={"Username"}
              name="username"
              type="text"
              placeholder="username"
            />
          )}
          <Field label={"Email"} name="email" type="text" placeholder="email" />
          <Field
            label={"Password"}
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
  );
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["login", "register"]).isRequired,
};
export default AuthForm;
