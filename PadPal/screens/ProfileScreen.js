import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Avatar, Text, Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import stylesGlobal, { showBorder } from "../styles/styles";
import { AuthContext } from "../navigation/AuthProvider";
import EditProfileScreen from "./EditProfileScreen";
import { useNavigation } from "@react-navigation/native";
import { Firestore } from "firebase/firestore";
import NewPostCard from "../components/NewPostCard";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import { getUser, getPosts } from "../firebase/firebaseMethods";

const ProfileScreen = () => {
  const theme = useTheme();
  const { user, logout } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [postCount, setPostCount] = useState(0);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(
          collection(db, "posts"),
          where("userId", "==", user.uid),
          orderBy("postTime", "desc")
        );
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

          setPostCount(postsList.length);

          setPosts(postsList);
          if (loading) {
            setLoading(false);
          }

          const ids = postsList.map((post) => post.id);
          console.log("Post IDs: ", ids);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();

    const getUser = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const userEntry = await getDoc(docRef);
        if (userEntry.exists()) {
          console.log("Document data:", userEntry.data());
          setUserInfo(userEntry.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    getUser();
  }, [isFocused]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // useEffect(() => {
  //   let unsubscribe = null;
  //   const fetchPosts = async () => {
  //     try {
  //       const { postsList, unsubscribe: unsub } = await getPosts(user.uid);
  //       setPostCount(postsList.length);
  //       setPosts(postsList);
  //       if (loading) {
  //         setLoading(false);
  //       }
  //       unsubscribe = unsub;
  //     } catch (error) {
  //       console.log("Error fetching posts: ", error);
  //     }
  //   };
  //   fetchPosts();

  //   const fetchUser = async () => {
  //     try {
  //       const userInfo = await getUser(user.uid);
  //       if (userInfo) {
  //         setUserInfo(userInfo);
  //       } else {
  //         console.log("No such user!");
  //       }
  //     } catch (error) {
  //       console.log("Error fetching user:", error);
  //     }
  //   };
  //   fetchUser();

  //   // Clean up the subscription on unmount
  //   return () => unsubscribe && unsubscribe();
  // }, [isFocused]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////
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
    <View style={stylesGlobal.innerContdainer}>
      <View style={styles.upperProfileSection}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar
                rounded
                size={100}
                // source={{
                //   uri: "https://example.com/user-profile.jpg",
                // }}
                title={userInfo.name?.substring(0, 1)}
                containerStyle={{ backgroundColor: "#e62929" }}
              />
              <View style={{ marginLeft: 20 }}>
                <Text h3>{userInfo.name}</Text>
                <Text h5 style={{ color: "grey" }}>
                  @{userInfo.username}
                </Text>
              </View>
            </View>
          </View>

          {/* <View style={styles.userBioSection}>
            <Text style={styles.description}>
              Pedro is a fire developer no cap, he is a beast at coding and a menace to society!
            </Text>
          </View> */}

          <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>Posts</Text>
              <Text h4 style={styles.infoBoxValue}>
                {postCount}
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>Saved Posts</Text>
              <Text h4 style={styles.infoBoxValue}>
                0
              </Text>
            </View>
          </View>

          <Button
            icon={<Icon name="edit" size={24} color="white" />}
            title=" Edit Profile"
            buttonStyle={{
              ...styles.editButton,
              backgroundColor: theme.colors.primary,
            }}
            onPress={() =>
              navigation.navigate("UserProfile", { screen: "EditProfile" })
            }
          />
          <Button
            title="Logout"
            buttonStyle={{
              ...styles.editButton,
              backgroundColor: theme.colors.primary,
            }}
            onPress={() =>
              Alert.alert("Confirmation", "Are you sure you want to logout?", [
                { text: "Yes", onPress: () => logout() },
                { text: "No" },
              ])
            }
          />
          <View style={styles.postsContainer}>
            <Text style={styles.postsTitle}>My Posts</Text>
            {posts.map((item) => (
              <NewPostCard
                key={item.id}
                item={item}
                onDelete={handleDeleteClicked}
              />
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.lowerProfileSection}>
        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upperProfileSection: {
    backgroundColor: "white",
    paddingBottom: 35,
    borderWidth: showBorder,
  },
  postsTitle: {
    padding: 25,
    fontSize: 28,
    textAlign: "center",
  },
  lowerProfileSection: {
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,

    borderWidth: showBorder,
  },
  userBioSection: {
    paddingHorizontal: 30,
    marginBottom: 25,

    borderWidth: showBorder,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,

    borderWidth: showBorder,
  },
  infoBox: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",

    borderWidth: showBorder,
  },
  infoBoxTitle: {
    fontSize: 15,
    color: "grey",
  },
  infoBoxValue: {
    color: "black",
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
    textAlign: "justify",
  },
  editButton: {
    marginHorizontal: 30,
    marginVertical: 20,
  },
  postsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    marginBottom: 10,
  },
});

export default ProfileScreen;
