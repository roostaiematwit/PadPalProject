import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, SafeAreaView, Animated, View } from "react-native";
import PostCard from "../components/PostCard";
import PadPalAnimation from "../animations/PadPalAnimation";

import stylesGlobal from "../styles";

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

const PostsScreen = () => {
  return (
    <View style={stylesGlobal.innerContainer}>
      <PostCard postData={postData} contentOpacity={1} />
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 2,
  },
});
