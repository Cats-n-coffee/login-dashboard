import * as React from "react";
import AuthForm from "components/AuthForm";
import { useAuth } from "context/auth.context";

export default function SignUpScreen() {
  React.useEffect(() => {
    document.title = "Sign Up";
    return () => (document.title = "Dashboard");
  }, []);
  const { register } = useAuth();
  const handleSubmit = (values) => register(values);
  return <AuthForm type="register" onSubmit={handleSubmit} />;
}
