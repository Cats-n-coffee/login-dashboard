import * as React from "react";
import { useAuth } from "context/auth.context";

function App() {
  const { user } = useAuth();
  console.log(user);
  return null;
}

export default App;
