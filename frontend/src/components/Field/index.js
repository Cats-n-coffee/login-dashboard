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
        input,
        textarea {
          width: 100%;
          padding-left: 1.25rem;
          height: 2.625rem;
          line-height: 2.625rem;
          font-size: 0.9375rem;
          color: var(--c10);
          opacity: 0.5;
          border-bottom: 1px solid var(--c10);
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
      <label
        css={`
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 0.5rem;
          .label {
            margin-right: 0.5rem;
            min-width: 5.35rem;
          }
        `}
      >
        <span className="label">{label}:</span>
        <Field {...fieldProps} className="field" />
      </label>
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
