import * as React from "react";
import { useAuth } from "context/auth.context";
import { Switch, Route, Redirect } from "react-router-dom";
import DashboardScreen from "screens/dashboard";

function App() {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/dashboard" component={DashboardScreen} />
      <Route path="*" component={() => <Redirect to="/dashboard" />} />
    </Switch>
  );
}

export default App;
