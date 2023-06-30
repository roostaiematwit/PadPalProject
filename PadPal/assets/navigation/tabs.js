import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useTheme } from "react-native-paper";

import HomeScreen from "../screens/SettingsScreen";
import PostsScreen from "../screens/PostsScreen";
import MakePostScreen from "../screens/MakePostScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary, // change this color to match your app's theme
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          elevation: 0,

          // position: "absolute",
          // bottom: 25,
          // left: 20,
          // right: 20,
          // elevation: 0,
          // backgroundColor: "#fff",
          // borderRadius: 15,
          // borderColor: "lightgrey",
          // borderWidth: 0,
          // height: 90,

          ...styles.shadow,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
              <View
                style={{
                  top: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="home" size={size} color={color} />
                <Text style={{ color: color, fontSize: 12 }}>Home</Text>
              </View>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
              <View
                style={{
                  top: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="chatbubble" size={size} color={color} />
                <Text style={{ color: color, fontSize: 12 }}>Chats</Text>
              </View>
            </>
          ),
        }}
      />

      <Tab.Screen
        name="MakePost"
        component={MakePostScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                width: 65,
                height: 65,
                backgroundColor: theme.colors.primary,
                borderRadius: 65 / 2,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
                ...styles.shadow,
              }}
            >
              <Image
                source={require("../icons/plus.png")}
                style={{
                  width: 22,
                  height: 22,
                  tintColor: "white",
                }}
              ></Image>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Posts"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
              <View
                style={{
                  top: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="person" size={size} color={color} />
                <Text style={{ color: color, fontSize: 12 }}>Profile</Text>
              </View>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <>
              <View
                style={{
                  top: 15,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="settings" size={size} color={color} />
                <Text style={{ color: color, fontSize: 12 }}>Settings</Text>
              </View>
            </>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5,
  },
  oppsiteShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
