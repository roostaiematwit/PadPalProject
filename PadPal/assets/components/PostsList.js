import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Animated,
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default PostsList = ({ posts, onDelete, onLike }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      {posts.map(
        (post) => (
          console.log(post),
          (
            <Animated.View key={post.id} style={[styles.card, { opacity: 1 }]}>
              <PostCard post={post} onLike={onLike} onDelete={onDelete} />
            </Animated.View>
          )
        )
      )}
    </ScrollView>
  );
};

export const PostCard = ({ post, onLike, onDelete }) => {
  return (
    <Card>
      <Card.Title title={post.user} />
      <Card.Content>
        <Image style={styles.image} source={{ uri: post.image }} />
        <Title>{post.title}</Title>
        <Paragraph>{post.text}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => {
            console.log("Like clicked");
            onLike(post.id);
          }}
        >
          {post.likes} Likes
        </Button>
        <Button onPress={() => {}}>Comment</Button>
        <TouchableOpacity
          onPress={() => {
            onDelete(post.id);
          }}
        >
          <Ionicons name="trash" size={24} color={"gray"} />
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingBottom: 120,
  },
  card: {
    margin: 10,
    padding: 5,
  },
  image: {
    width: "100%",
    height: 200,
  },
});
