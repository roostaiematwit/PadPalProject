import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import PostsScreen from "../screens/PostsScreen";
import MakePostScreen from "../screens/MakePostScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: 12,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "navy",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "navy", // change this color to match your app's theme
        tabBarInactiveTintColor: "gray",
        tabBarIconSize: 10,
        headerShown: false,
        tabBarStyle: {
          //   backgroundColor: "#fff",
          //   borderTopWidth: 0,
          //   elevation: 0,
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#fff",
          borderRadius: 15,
          height: 90,

          ...styles.shadow,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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

      <Tab.Screen name="MakePost" component={MakePostScreen} />

      <Tab.Screen
        name="Posts"
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
                <Ionicons name="list" size={size} color={color} />
                <Text style={{ color: color, fontSize: 12 }}>Posts</Text>
              </View>
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
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
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shdaowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
