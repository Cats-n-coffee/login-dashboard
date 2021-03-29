import { useQuery } from "react-query";
import * as React from "react";
import * as auth from "utils/auth";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

export function AuthProvider(props) {
  const { data: user, status, error } = useQuery({
    queryKey: ["user"],
    queryFn: auth.getToken,
  });
  console.log(user, error, status);
  if (["loading", "idle"].includes(status)) {
    return <p>Loading...</p>;
  }
  if (status === "error") {
    return <p>{JSON.stringify(error)}</p>;
  }
  const value = { user };
  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used inside of AuthProvider`);
  }
  return context;
}
