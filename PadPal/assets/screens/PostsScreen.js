import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, SafeAreaView, Animated } from "react-native";
import PostCard from "../components/PostCard";
import PadPalAnimation from "../animations/PadPalAnimation";
import { useFonts } from "expo-font";

const postData = [
  {
    id: 1,
    user: "Nick",
    image: "https://example.com/user1.jpg",
    text: "This is a post from user1",
    likes: 10,
  },
  {
    id: 2,
    user: "Pedro",
    image: "https://example.com/user2.jpg",
    text: "This is a post from user2",
    likes: 5,
  },
  {
    id: 3,
    user: "Marco",
    image: "https://example.com/user3.jpg",
    text: "This is a post from user3",
    likes: 2,
  },
  // More posts...
];
export default PostsScreen = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const contentOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return () => {
      console.log("ANimation done");
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };
  }, [isAnimating]);

  const [fontsLoaded] = useFonts({
    LogoFont: require("../fonts/Typo_Round_Bold_Demo.otf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <PadPalAnimation
        isAnimating={isAnimating}
        setIsAnimating={setIsAnimating}
      />

      {isAnimating ? null : (
        <>
          <Text style={styles.title}>PadPal</Text>
          <PostCard postData={postData} contentOpacity={contentOpacity} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 2,
  },
  title: {
    fontFamily: "LogoFont",
    fontSize: 50,
    fontWeight: "bold",
    color: "navy",
    textAlign: "center",
  },
});
