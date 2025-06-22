import { useState } from "react";
import { EmailFields } from "./types";
import { Alert } from "react-native";

const useLoginController = () => {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [emailFields, setEmailFields] = useState<EmailFields>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleEmailFieldsInput = (
    fieldName: keyof EmailFields,
    value: string
  ) => {
    setEmailFields((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleLogin = () => {
    const { username, password } = emailFields;

    if (!username || !password) {
      Alert.alert("Please enter both email and password");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert("Login Successful", `Welcome, ${username}!`);
    }, 1000);
  };

  return {
    emailFields,
    handleEmailFieldsInput,
    handleLogin,
    loading,
    isLoginScreen,
    setIsLoginScreen,
  };
};

export default useLoginController;
