import * as React from "react";
import axios from "utils/axios";
import { TopPanel } from "components/TopPanel/Panel";

export default function DashboardScreen() {
  React.useEffect(() => {
    axios.get("dashboard");
  }, []);
  return (
    <div>
      <TopPanel />
      Dashboard
    </div>
  );
}
