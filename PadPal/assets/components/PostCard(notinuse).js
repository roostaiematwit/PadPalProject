import React from "react";
import { Animated, ScrollView, StyleSheet, Image } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default function PostCard({ postData, contentOpacity }) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      {postData.map((post) => (
        <Animated.View
          key={post.id}
          style={[styles.card, { opacity: contentOpacity }]}
        >
          <Card>
            <Card.Title title={post.user} />
            <Card.Content>
              <Image style={styles.image} source={{ uri: post.image }} />
              <Title>Post</Title>
              <Paragraph>{post.text}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => {}}>{post.likes} Likes</Button>
              <Button onPress={() => {}}>Comment</Button>
            </Card.Actions>
          </Card>
        </Animated.View>
      ))}
    </ScrollView>
  );
}

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
