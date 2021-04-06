import * as React from "react";
import AuthForm from "components/AuthForm/AuthForm2";
import { useRegister } from "../utils/auth.hooks";

// export default function SignUpScreen() {
//   React.useEffect(() => {
//     document.title = "Sign Up";
//     return () => (document.title = "Dashboard");
//   }, []);
//   const { register } = useAuth();
//   const handleSubmit = (values) => register(values);
//   return <AuthForm type="register" onSubmit={handleSubmit} />;
// }

export default function SignUpScreen() {
  React.useEffect(() => {
    document.title = "Sign Up";
    return () => (document.title = "Dashboard");
  }, []);
  const mutation = useRegister();
  return <AuthForm type="register" mutation={mutation} />;
}
