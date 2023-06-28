import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useReducer,
} from "react";
import { StyleSheet, Text, SafeAreaView, Animated, View } from "react-native";
import PostsList from "../components/PostsList";
import AddPosts from "../components/AddPosts";
import { auth } from "../../firebase";

import stylesGlobal from "../styles";

let nextId = 2;
const initialPosts = [
  {
    id: 1,
    user: "Nick",
    image: "https://example.com/user1.jpg",
    title: "Post 1",
    text: "This is a post from user1",
    likes: 0,
  },
  {
    id: 2,
    user: "Pedro",
    image: "https://example.com/user2.jpg",
    title: "Post 2",
    text: "This is a post from user2",
    likes: 0,
  },
];

export default PostsScreen = () => {
  const [posts, dispatch] = useReducer(postsReducer, initialPosts);

  const handleAddPost = (post) => {
    dispatch({ type: "added", post: post });
  };

  const handleDeletePost = (postId) => {
    dispatch({ type: "deleted", id: postId });
  };

  const handleLikePost = (postId) => {
    dispatch({ type: "liked", id: postId, likes: postId.likes++ });
  };

  return (
    <View style={stylesGlobal.innerContainer}>
      {/* <AddPosts onAddPost={handleAddPost} /> */}
      <Text>{auth.currentUser?.email}</Text>
      <PostsList
        posts={posts}
        onDelete={handleDeletePost}
        onLike={handleLikePost}
      />
    </View>
  );
};

const postsReducer = (posts, action) => {
  switch (action.type) {
    case "added":
      return [...posts, action.post];
    case "deleted": {
      return posts.filter((post) => post.id !== action.id);
    }
    case "liked": {
      return posts.map((post) => {
        if (post.id === action.id) {
          return { ...post, likes: post.likes + 1 };
        } else {
          return post;
        }
      });
    }
    default: {
      throw Error("Unkown action type: " + action.type);
    }
  }
};

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
