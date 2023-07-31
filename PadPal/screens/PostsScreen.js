import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Container, CenterText, StatusWrapper } from "../styles/FeedStyles";
import NewPostCard from "../components/NewPostCard";
import { AuthContext } from "../navigation/AuthProvider";
import { getPosts, deletePost, savePost } from "../firebase/firebaseMethods";
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "../styles/theme";

export default PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = getPosts((postsList) => {
      setPosts(postsList);
      if (loading) {
        setLoading(false);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleSavedClicked = (postId) => {
    console.log("Saved clicked for post: ", postId);
    savePost(postId, user.uid, true);
  };

  const handleDeleteClicked = (postId) => {
    console.log("Delete clicked for post: ", postId);
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            deletePost(postId);
          },
        },
      ],
      { cancelable: false }
    );
  };

  handlePostClicked = () => {
    console.log("Post clicked");
  };

  return (
    <Container style={styles.cardsContainer}>
      {loading ? (
        <StatusWrapper>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </StatusWrapper>
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <NewPostCard
              item={item}
              onDelete={handleDeleteClicked}
              onSaved={handleSavedClicked}
              onPress={handlePostClicked}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", marginTop: 10 }}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    padding: 10,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 2,
  },
});
