// eslint-disable-next-line
import styled from "styled-components/macro";
import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginScreen from "screens/login";
import SignUpScreen from "screens/signup";
import { Content } from "components/lib";
import { Github } from "components/Icons";

export default function UnAuthApp() {
  return (
    <>
      <Content
        as="main"
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        <Switch>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={SignUpScreen} />
          <Route path="*" component={() => <Redirect to="/login" />} />
        </Switch>
      </Content>
      <footer>
        <Content
          css={`
            padding: 1rem 0;
            text-align: center;
            svg {
              max-height: 1.5rem;
            }
          `}
        >
          <a
            target="_blank"
            href="https://github.com/Cats-n-coffee/login-dashboard"
            rel="noreferrer"
            title="view source code"
          >
            <Github />
          </a>
        </Content>
      </footer>
    </>
  );
}
