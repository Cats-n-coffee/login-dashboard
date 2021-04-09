// eslint-disable-next-line
import styled from "styled-components/macro";
import { useQueryClient } from "react-query";
import * as React from "react";
import { useGetUser } from "../utils/auth.hooks";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

export function AuthProvider(props) {
  const queryClient = useQueryClient();
  const { data, status } = useGetUser();
  const [user, setUser] = React.useState(() => {
    try {
      return queryClient.getQueryData(["user"]);
    } catch (e) {
      console.log(e);
      return null;
    }
  });

  React.useEffect(() => {
    if (status === "success" && data) setUser(data);
  }, [status, data]);

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
    console.log("error");
  }

  const value = { user, setUser };
  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used inside of AuthProvider`);
  }
  return context;
}
