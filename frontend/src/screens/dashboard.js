import * as React from "react";
import axios from "utils/axios";
import TopPanel from "components/TopPanel";

export default function DashboardScreen() {
  React.useEffect(() => {
    axios.get("dashboard");
  }, []);

  React.useEffect(() => {
    document.body.style.background = "var(--color-background)";
  }, []);

  return (
    <div>
      <TopPanel />
      Dashboard
    </div>
  );
}
