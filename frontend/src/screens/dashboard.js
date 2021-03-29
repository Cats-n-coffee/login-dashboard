import * as React from "react";
import axios from "utils/axios";

export default function DashboardScreen() {
  React.useEffect(() => {
    axios.get("dashboard");
  }, []);
  return <div>Dashboard</div>;
}
