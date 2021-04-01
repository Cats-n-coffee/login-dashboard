import * as React from "react";
import AuthedApp from "./app.authed";
import UnAuthApp from "./app.unAuthed";
import { useAuth } from "context/auth.context";

function App() {
  const { user } = useAuth();
  return user ? <AuthedApp /> : <UnAuthApp />;
}

export default App;
