// eslint-disable-next-line
import styled from "styled-components/macro";
import { Error } from "components/lib";
import PropTypes from "prop-types";
import * as React from "react";
import { Field, ErrorMessage } from "formik";

export default function FormField({ type, label, ...props }) {
  const component = type === "textarea" ? "textarea" : "input";
  const fieldProps = { ...props, component };
  if (type !== "textarea") fieldProps.type = type;
  return (
    <div
      css={`
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid var(--c11);
        input,
        textarea {
          width: 100%;
          padding-left: 1.25rem;
          /* height: 2.625rem; */
          line-height: 2.625rem;
          font-size: 0.9375rem;
          color: var(--color-input);
          opacity: 0.5;
          background: none;

          &:focus {
            opacity: 1;
          }
        }
        textarea {
          min-height: 5.625rem;
        }
        .error-msg {
          display: block;
          padding-left: 5.85rem;
          margin-top: 0.5rem;
        }
      `}
    >
      <div
        className="user-input"
        css={`
          display: flex;
        `}
      >
        <label
          css={`
            display: flex;
            align-items: center;
            color: var(--color-text);
            margin-right: 0.5rem;
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
