import { useFonts } from "expo-font";
import React, { useState, useEffect, useRef } from "react";
import { Animated, View, Text, StatusBar, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import LoginScreen from "./assets/screens/LoginScreen";
import ProfileScreen from "./assets/screens/ProfileScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./assets/navigation/tabs";
import PadPalAnimation from "./assets/animations/PadPalAnimation";
import stylesGlobal from "./assets/styles";
import CreateAccount from "./assets/screens/CreateAccount";

//NEW CODE
import RegisterScreen from "./components/Register";
import LoginScreen from "./components/Login";
import { auth } from "./firebase";

const Stack = createNativeStackNavigator();

export default function App() {
  //Load custom fonts
  const [fontsLoaded] = useFonts({
    LogoFont: require("./assets/fonts/Typo_Round_Bold_Demo.otf"),
  });

  //Opening Animation
  const [isAnimating, setIsAnimating] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { height } = Dimensions.get("window");
  const contentOpacity = useRef(new Animated.Value(0)).current;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setLoaded(true);
      }
    });
    return unsubscribe;
  }, []);

  // Animation to have screen fade in after opening animation
  useEffect(() => {
    return () => {
      console.log("Animation done");
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }).start();
    };
  }, [isAnimating]);

  if (!fontsLoaded) {
    return undefined;
  }

  // Change state depending on if user is logged in or not
  const state = () => {
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!isLoggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    );
  };

  // APP wrapper
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff" }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View style={stylesGlobal.padPalContainer}>
        {isAnimating ? (
          <PadPalAnimation
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
            ScreenHeight={height}
          />
        ) : (
          <>
            <Text style={{ ...stylesGlobal.title, bottom: -3 }}>PadPal</Text>
            <Animated.View
              style={{
                flex: 1,
                opacity: contentOpacity,
                backgroundColor: "#fff",
              }}
            >
              {state()}
            </Animated.View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = {
  container: {
    borderWidth: 1,
    borderColor: "red",
  },
};
