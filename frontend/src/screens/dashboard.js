import * as React from "react";
import axios from "utils/axios";
import TopPanel from "components/TopPanel";
import styled from "styled-components/macro";

export default function DashboardScreen() {
  React.useEffect(() => {
    axios.get("dashboard");
  }, []);

  React.useEffect(() => {
    document.body.style.background = "var(--color-background)";
  }, []);

  return (
    <div
      css={`
        height: 100vh;
      `}
    >
      <TopPanel />
      Dashboard
    </div>
  );
}
