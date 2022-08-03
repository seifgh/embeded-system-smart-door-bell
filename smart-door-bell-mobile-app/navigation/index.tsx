import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import Colors from "../constants/Colors";
import HistoryScreen from "../screens/HistoryScreen";
import SignInScreen from "../screens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => (
  <Stack.Navigator
    initialRouteName="SignIn"
    screenOptions={{
      contentStyle: {
        backgroundColor: "white",
      },
    }}
  >
    <Stack.Screen
      name="Root"
      component={BottomTabNavigator}
      options={{
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="SignIn"
      options={{ headerShown: false }}
      component={SignInScreen}
    />
  </Stack.Navigator>
);

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: 62,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarActiveTintColor: Colors.tint,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<"Home">) => ({
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-outline" color={color} />
          ),
          headerRight: () => <></>,
          headerShown: false,
        })}
      />
      <BottomTab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="document-text-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
const TabBarIcon: React.FC<{
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}> = (props) => <Ionicons name={props.name} size={24} color={props.color} />;
