import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ROUTES } from "../constants/routes";
import { navigationRef } from "./helper";
import HomeTabsNavigator from "./Tabs";
import { Home, Profile } from "../screens";

const Stack = createStackNavigator();

function ApplicationNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor={"#FFFFFF"} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.HOME} component={HomeTabsNavigator} />
        <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
