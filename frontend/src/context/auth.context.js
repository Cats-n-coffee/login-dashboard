// eslint-disable-next-line
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import * as React from "react";
import * as auth from "utils/auth";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

export function AuthProvider(props) {
  const { data, status, error } = useQuery({
    queryKey: ["user"],
    queryFn: auth.getUser,
  });
  const [user, setUser] = React.useState(data);
  React.useEffect(() => {
    if (status === "success" && data) {
      setUser(data);
    }
  }, [status, data]);
  const register = React.useCallback(
    (form) => {
      auth.register(form).then((data) => {
        setUser(data);
      });
    },
    [setUser]
  );
  const login = React.useCallback(
    (form) => {
      auth.login(form).then((data) => setUser(data));
    },
    [setUser]
  );
  if (["loading", "idle"].includes(status)) {
    return (
      <div
        css={`
          position: fixed;
          top: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
        `}
      >
        <p>Loading...</p>
      </div>
    );
  }
  if (status === "error") {
    return <p>{JSON.stringify(error)}</p>;
  }
  const value = { user, register, login };
  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used inside of AuthProvider`);
  }
  return context;
}
