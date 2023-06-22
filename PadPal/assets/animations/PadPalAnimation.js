// PadPalAnimation.js

import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import stylesGlobal from "../styles";

export default function PadPalAnimation({
  isAnimating,
  setIsAnimating,
  ScreenHeight,
}) {
  const height = ScreenHeight;
  const padXPosition = useRef(new Animated.Value(-150)).current;
  const palXPosition = useRef(new Animated.Value(150)).current;
  const yPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(padXPosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(palXPosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      Animated.timing(yPosition, {
        toValue: -height / 1.75 + 109.5,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    });
  }, []);

  const padStyle = {
    transform: [{ translateX: padXPosition }, { translateY: yPosition }],
  };

  const palStyle = {
    transform: [{ translateX: palXPosition }, { translateY: yPosition }],
  };
  if (!isAnimating) {
    return null;
  }

  return (
    <View style={styles.tempAnimation}>
      <Animated.Text style={[stylesGlobal.title, padStyle]}>Pad</Animated.Text>
      <Animated.Text style={[stylesGlobal.title, palStyle]}>Pal</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tempAnimation: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
