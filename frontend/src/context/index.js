import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyles";
import { AuthProvider } from "./auth.context.2";
import { ThemeProvider } from "./theme.context";

const client = new QueryClient({
  defaultOptions: {
    staleTime: 29 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    retry: 0,
  },
});
export default function AppProvider({ children }) {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={client}>
        <AuthProvider>
          <ThemeProvider>
            <Router>{children}</Router>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
