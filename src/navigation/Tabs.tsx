import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; // or any icon family
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useIsFocused } from "@react-navigation/native";
import useTypedNavigation from "./hooks";

import { TabsParamsList } from "../types/navigation";
import { ROUTES } from "../constants/routes";
import { Home, Message, Profile, Search, Settings } from "../screens";

const { width, height } = Dimensions.get("window"),
  TAB_BAR_WIDTH = width / 5;

const Tab = createBottomTabNavigator<TabsParamsList>();

const size = 28;
const color = "blue";

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
  },
  innerView: {
    paddingVertical: Math.floor(height * 0.022),
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    width: TAB_BAR_WIDTH,
    textAlign: "center",
  },
  iconSize: {
    height: 24,
    width: 24,
  },
});

const getTabIcon = ({ tabName, isFocused }: any) => {
  switch (tabName) {
    case ROUTES.HOME: {
      return (
        <Icon
          name={isFocused ? "home" : "home-outline"}
          size={size}
          color={color}
        />
      );
    }
    case ROUTES.MESSAGES:
      return (
        <MaterialCommunityIcons
          name={isFocused ? "message" : "message-outline"}
          size={size}
          color={color}
        />
      );
    case ROUTES.SEARCH: {
      return (
        <Icon
          name={isFocused ? "search" : "search-outline"}
          size={size}
          color={color}
        />
      );
    }
    case ROUTES.PROFILE: {
      return (
        <Icon
          name={isFocused ? "person" : "person-outline"}
          size={size}
          color={color}
        />
      );
    }
  }
};

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "hsl(199, 75.60%, 83.90%)",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = (options.tabBarLabel as string) || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const icon = getTabIcon({
          tabName: route.name,
          isFocused,
          color: isFocused ? "#007AFF" : "#8E8E93", // customize as needed
          size: 24,
        });
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <View style={styles.innerView}>{icon}</View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const HomeTabsNavigator = () => {
  const navigator = useTypedNavigation();
  const isFocus = useIsFocused();

  return (
    <>
      {/* <StatusBar backgroundColor={Colors.white} /> */}
      <Tab.Navigator
        tabBar={(props) => <TabBar {...props} />}
        initialRouteName={ROUTES.HOME}
        screenOptions={{
          headerShown: true,
          tabBarStyle: {
            position: "absolute",
            // paddingBottom: 50,
          },
        }}
      >
        <Tab.Screen
          name={ROUTES.HOME}
          component={Home}
          options={{
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name={ROUTES.SEARCH}
          component={Search}
          options={{
            tabBarLabel: "Search",
          }}
        />
        <Tab.Screen
          name={ROUTES.MESSAGES}
          component={Message}
          options={{
            tabBarLabel: "Message",
          }}
        />
        <Tab.Screen
          name={ROUTES.PROFILE}
          component={Profile}
          options={{
            tabBarLabel: "Profile",
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default HomeTabsNavigator;
