import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DashboardScreen from "screens/dashboard";

function App() {
  return (
    <Switch>
      <Route path="/dashboard" component={DashboardScreen} />
      <Route path="*" component={() => <Redirect to="/dashboard" />} />
    </Switch>
  );
}

export default App;
