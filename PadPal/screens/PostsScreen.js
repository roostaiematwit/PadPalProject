import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, FlatList, Alert } from "react-native";
import { Container, CenterText } from "../styles/FeedStyles";
import NewPostCard from "../components/NewPostCard";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db, storage } from "../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { AuthContext } from "../navigation/AuthProvider";

const Posts = [
  {
    id: 1,
    userName: "Nick",
    userImg: require("../assets/users/user1.png"),
    postTime: "4 mins ago",
    post: "This is a test post to see how stuff works and it dodesnt faiul",
    postImg: require("../assets/posts/Room1.png"),
    saved: true,
    saves: 12,
  },
  {
    id: 2,
    userName: "Pedro",
    userImg: require("../assets/users/user2.png"),
    postTime: "1 hour ago",
    post: "Post 2",
    postImg: require("../assets/posts/Room2.png"),
    saved: false,
    saves: 1,
  },
  {
    id: 3,
    userName: "Marco",
    userImg: require("../assets/users/user2.png"),
    postTime: "1 hour ago",
    post: "Post 2",
    postImg: "none",
    saved: false,
    saves: 1,
  },
];

export default PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("postTime", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const postsList = [];
          querySnapshot.forEach((doc) => {
            const { userId, post, postImg, postTime, saves } = doc.data();
            postsList.push({
              id: doc.id,
              userId: userId,
              userName: "Test Name",
              userImg:
                "https://firebasestorage.googleapis.com/v0/b/padpal-ba095.appspot.com/o/images%2F15CD67AB-C41A-41E6-A454-74922A6BE0E7.jpg?alt=media&token=096e0146-7fa2-458b-99c1-d7b3708fe50d",
              postTime: postTime,
              post: post,
              postImg: postImg,
              saved: false,
              saves: "0",
            });
          });

          setPosts(postsList);
          if (loading) {
            setLoading(false);
          }
          // Console log only the IDs
          const ids = postsList.map((post) => post.id);
          console.log("Post IDs: ", ids);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  const deletePost = async (postId) => {
    const postRef = doc(db, "posts", postId);

    try {
      await deleteDoc(postRef);
      console.log(`Document with ID ${postId} deleted.`);
    } catch (error) {
      console.error(`Error deleting document with ID ${postId}:`, error);
    }
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

  return (
    <Container>
      <CenterText>Welcome {user.email}!</CenterText>
      {posts.length == 0 ? (
        <CenterText>No posts to show</CenterText>
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <NewPostCard item={item} onDelete={handleDeleteClicked} />
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
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 2,
  },
});
