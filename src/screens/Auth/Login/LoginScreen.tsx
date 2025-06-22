import React from "react";
import { StyleSheet } from "react-native";

import {
  BaseView,
  Container,
  SubTitleText,
  TitleText,
} from "@/components/atoms";
import { config } from "@/theme/_config";
import { hp, wp } from "@/utils/layoutUtils";
import { SafeScreen } from "@/components/template";
import useLoginController from "./LoginController";
import { staticFontStyles } from "@/theme/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EmailPasswordInputContainer from "./components/Email";

const LoginScreen = () => {
  const {
    emailFields,
    handleEmailFieldsInput,
    handleLogin,
    loading,
    isLoginScreen,
    setIsLoginScreen,
  } = useLoginController();

  return (
    <SafeScreen>
      <Container>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={[{ flex: 1 }]}
          contentContainerStyle={[
            { flex: 1 },
            { justifyContent: "space-between" },
          ]}
          nestedScrollEnabled
        >
          <BaseView style={{ flex: 1 }}>
            {/* Header */}
            <BaseView
              style={[
                { flexDirection: "row" },
                { justifyContent: "space-between" },
                styles.headerContainer,
              ]}
            >
              <BaseView>
                <TitleText>
                  {isLoginScreen ? "Login account" : "Signup"}
                </TitleText>
                <SubTitleText style={{ marginTop: hp(4), fontSize: 13 }}>
                  {isLoginScreen
                    ? "Hello, Welcome back!"
                    : "Welcome to Treefe!"}
                </SubTitleText>
              </BaseView>
            </BaseView>
            {/*  */}
            <BaseView style={{ marginTop: hp(35) }}>
              {/* <LoginTabSwitcherMolecule
                isEmailTab={isEmailTab}
                onSwitchTab={switchTab}
              /> */}
            </BaseView>

            <EmailPasswordInputContainer
              handleEmailFieldsInput={handleEmailFieldsInput}
              emailFields={emailFields}
              isLoginScreen={isLoginScreen}
              handleLogin={handleLogin}
              isLoading={loading}
              onRequestOtp={null}
            />
          </BaseView>
          {/* Footer View */}
          <BaseView style={{ alignItems: "center", justifyContent: "center" }}>
            <SubTitleText style={{ color: "#709C3C" }}>
              {isLoginScreen
                ? "Don’t have an account?  "
                : "Already have an account?  "}
              <SubTitleText
                style={[staticFontStyles.underline, { color: "#476F22" }]}
                onPress={() => setIsLoginScreen(!isLoginScreen)}
              >
                {isLoginScreen ? "Sign up" : "Sign in"}
              </SubTitleText>
            </SubTitleText>
            <BaseView style={{ height: hp(20) }} />
          </BaseView>
        </KeyboardAwareScrollView>
      </Container>
    </SafeScreen>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  headerContainer: { marginTop: hp(27) },
  countryContainer: {
    width: wp(32),
    height: wp(32),
    borderRadius: wp(16),
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    padding: 2,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 5,
    paddingVertical: 4,
    backgroundColor: "#476F22",
    borderRadius: 5,
  },
  tab: {
    padding: 5,
    backgroundColor: "#476F22",
    marginRight: 10,
    borderRadius: 5,
    flex: 1,
  },
  activeTab: {
    backgroundColor: "#709C3C",
  },
  tabText: {
    color: "black",
    textAlign: "center",
  },
  otpText: {
    paddingVertical: 11,
    textAlign: "center",
    color: config.backgrounds.white,
  },
});
