// eslint-disable-next-line
import styled from "styled-components/macro";
import { Error } from "components/lib";
import PropTypes from "prop-types";
import * as React from "react";
import { Field, ErrorMessage } from "formik";

export default function FormField({ label, ...props }) {
  const fieldProps = { ...props };
  return (
    <div
      css={`
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;

        input {
          width: 100%;
          padding-left: 1rem;
          line-height: 2.625rem;
          font-size: 0.9375rem;
          color: var(--color-text);
          opacity: 0.5;
          background: none;

          &:focus {
            opacity: 1;
          }
        }
        .error-msg {
          display: block;
          margin-top: 0.5rem;
        }
      `}
    >
      <div
        css={`
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--c30);
          input {
            flex-grow: 1;
            align-self: flex-end;
            background: none;
          }
        `}
      >
        <label
          css={`
            min-width: 5.65rem;
            color: var(--color-text);
            letter-spacing: 0.03rem;
          `}
        >
          {label}:
        </label>
        <Field {...fieldProps} className="field" />
      </div>
      <Error className="error-msg" as="small">
        <ErrorMessage name={props.name} />
      </Error>
    </div>
  );
}
FormField.defaultProps = {
  type: "text",
};
FormField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["email", "text", "password"]),
};
