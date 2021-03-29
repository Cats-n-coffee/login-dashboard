import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyles";
import { AuthProvider } from "./auth.context";

const client = new QueryClient();
export default function AppProvider({ children }) {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Router>{children}</Router>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
