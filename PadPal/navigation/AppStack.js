import React, { useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import stylesGlobal from "../styles/styles";
import { COLORS } from "../styles/theme";

import PostsScreen from "../screens/PostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChatsScreen from "../screens/ChatsScreen";
import SingleChatScreen from "../screens/SingleChatScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MakePostScreen from "../screens/MakePostScreen";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack = ({ navigation }) => {};

const MessagesStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen name="Chat" component={ChatsScreen} />
    <Stack.Screen
      name="SingleChat"
      component={SingleChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => {};

//Work in progress
export const pages = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: COLORS.primary, // change this color to match your app's theme
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
        tabBarVisible: getTabBarVisibility(route),
      })}
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
        component={MessagesStack}
        options={({route}) => ({
          //check back in on this, is tabBarVisible a prop that does something in our case?
          tabBarVisible: getTabBarVisibility(route),
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
        })}
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
                backgroundColor: COLORS.primary,
                borderRadius: 65 / 2,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
                ...styles.shadow,
              }}
            >
              <Image
                source={require("../assets/icons/plus.png")}
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

  //remove tab bar on singlechat page
  const getTabBarVisibility = (route) => {
    const routeName = route.state 
    ? route.state.routes[route.state.index].name 
    : '' || 'Home'

    if(routeName === 'SingleChat')
      return false;
    return true;
  }


const AppStack = () => {
  const contentOpacity = useRef(new Animated.Value(0)).current;

  //Fade in animation
  useEffect(() => {
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
        <Text style={styles.logoTitle}>PadPal</Text>
        {pages()}
      </Animated.View>
    </View>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: stylesGlobal.showBorder,
  },
  logoTitle: {
    ...stylesGlobal.title,
    bottom: -3,
  },
});
