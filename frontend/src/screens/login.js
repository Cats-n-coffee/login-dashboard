import * as React from "react";
import AuthForm from "components/AuthForm/AuthForm2";
import { useLogin } from "../utils/auth.hooks";

// export default function LoginScreen() {
//   React.useEffect(() => {
//     document.title = "Login";
//     return () => (document.title = "Dashboard");
//   }, []);
//   const { login } = useAuth();
//   const handleSubmit = (values) => login(values);
//   return <AuthForm type="login" onSubmit={handleSubmit} />;
// }

export default function LoginScreen() {
  React.useEffect(() => {
    document.title = "Login";
    return () => (document.title = "Dashboard");
  }, []);
  const mutation = useLogin();
  return <AuthForm type="login" mutation={mutation} />;
}
