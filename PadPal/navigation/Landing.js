import { StyleSheet, Text, View, Animated, StatusBar } from "react-native";
import React, { useEffect, useState, useRef } from "react";

import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import stylesGlobal from "../styles/styles";
import PadPalAnimation from "../assets/animations/PadPalAnimation";
import { windowHeight } from "../utils/Dimensions";
const Landing = ({ user }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const contentOpacity = useRef(new Animated.Value(0)).current;

  // Animation to have screen fade in after opening animation
  useEffect(() => {
    return () => {
      console.log("PadPal Animation done");
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    };
  }, [isAnimating]);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff" }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <View style={styles.container}>
        {isAnimating ? (
          <PadPalAnimation
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
            ScreenHeight={windowHeight}
          />
        ) : user ? (
          <AppStack />
        ) : (
          <AuthStack />
        )}
      </View>
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: stylesGlobal.showBorder,
    marginTop: 35,
    marginBottom: 0,
    borderColor: "red",
  },
});
