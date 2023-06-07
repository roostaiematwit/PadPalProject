import { useFonts } from "expo-font";
import React, { useState, useEffect, useRef } from "react";
import { Animated, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./assets/navigation/tabs";
import PadPalAnimation from "./assets/animations/PadPalAnimation";
import stylesGlobal from "./assets/styles";

export default function App() {
  //Load custom fonts
  const [fontsLoaded] = useFonts({
    LogoFont: require("./assets/fonts/Typo_Round_Bold_Demo.otf"),
  });

  //Opening Animation
  const [isAnimating, setIsAnimating] = useState(true);
  const contentOpacity = useRef(new Animated.Value(0)).current;

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

  return (
    <View style={stylesGlobal.notch}>
      <View style={stylesGlobal.screenContainer}>
        <PadPalAnimation
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
        />

        {isAnimating ? null : (
          <>
            <Text style={stylesGlobal.title}>PadPal</Text>
            <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
              <NavigationContainer>
                <Tabs />
              </NavigationContainer>
            </Animated.View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = {};
