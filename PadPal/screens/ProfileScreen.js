import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Avatar, Text, Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import stylesGlobal, { showBorder } from "../styles/styles";
import { AuthContext } from "../navigation/AuthProvider";
import EditProfileScreen from "./EditProfileScreen";
import { useNavigation } from "@react-navigation/native";
import NewPostCard from "../components/NewPostCard";
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "../styles/theme";
import {
  getUser,
  getPosts,
  deletePost,
  getSavedPosts,
  savePost,
  userHasSavedPost,
  subscribeToSavedPosts,
} from "../firebase/firebaseMethods";

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [postCount, setPostCount] = useState(0);
  const [savedPostsCount, setSavedPostsCount] = useState(0);
  const [savedPostsInfo, setSavedPostsInfo] = useState([]);
  const [selected, setSelected] = useState("myPosts");

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  //refreshes anytime there is an update to posts
  useEffect(() => {
    const unsubscribe = getPosts(
      (postsList) => {
        setPosts(postsList);
        setPostCount(postsList.length);
        if (loading) {
          setLoading(false);
        }
      },
      user.uid,
      "MYPOSTS"
    );
    const unsubscribeFromSavedPosts = subscribeToSavedPosts(
      user.uid,
      setSavedPostsInfo
    );

    // Clean up the subscription on unmount
    return () => {
      unsubscribe && unsubscribe();
      unsubscribeFromSavedPosts && unsubscribeFromSavedPosts();
    };
  }, []);

  //Refreshses everytime profile screen is focused
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser(user.uid);
      setUserInfo(fetchedUser);
    };
    fetchUser();

    const fetchSavedPosts = async () => {
      const savedPosts = await getSavedPosts(user.uid);
      setSavedPostsInfo(savedPosts);
      setSavedPostsCount(savedPosts.length);
    };
    fetchSavedPosts();
  }, [isFocused]);

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
  const handleSavedClicked = async (postId) => {
    console.log("Saved clicked for post: ", postId);
    const isSaved = await userHasSavedPost(user.uid, postId);

    if (isSaved) {
      return await savePost(postId, user.uid, false);
    } else {
      return await savePost(postId, user.uid, true);
    }
  };

  const handlePostClicked = async (userId) => {
    console.log("=============== Clicked on : " + userId);

    try {
      const savedPosts = await getSavedPosts(userId);

      if (savedPosts.length === 0 || savedPosts === null) {
        Alert.alert("No posts saved", "This user hasn't saved any posts yet.");
      } else {
        // Handle the saved posts.
        savedPosts.forEach((post) => console.log(post.id));
      }
    } catch (error) {
      console.error("Error getting saved posts:", error);
    }
  };

  return (
    <View style={stylesGlobal.innerContainer}>
      <View style={styles.upperProfileSection}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar
                rounded
                size={100}
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
                {savedPostsCount}
              </Text>
            </View>
          </View>

          <Button
            icon={<Icon name="edit" size={24} color="white" />}
            title=" Edit Profile"
            buttonStyle={{
              ...styles.editButton,
              backgroundColor: COLORS.primary,
            }}
            onPress={() =>
              navigation.navigate("UserProfile", { screen: "EditProfile" })
            }
          />
          <View style={styles.postsContainer}>
            <View style={styles.radioButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selected === "myPosts" && styles.radioButtonActive,
                ]}
                onPress={() => setSelected("myPosts")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selected === "myPosts" && styles.radioButtonTextActive,
                  ]}
                >
                  My Posts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selected === "savedPosts" && styles.radioButtonActive,
                ]}
                onPress={() => setSelected("savedPosts")}
              >
                <Text
                  style={[
                    styles.radioButtonText,
                    selected === "savedPosts" && styles.radioButtonTextActive,
                  ]}
                >
                  Saved Posts
                </Text>
              </TouchableOpacity>
            </View>

            {selected === "myPosts" && (
              <>
                {posts.map((item) => (
                  <NewPostCard
                    key={item.id}
                    item={item}
                    onDelete={handleDeleteClicked}
                    onSaved={handleSavedClicked}
                    onPress={handlePostClicked}
                    showSave={false}
                    showContact={false}
                  />
                ))}
              </>
            )}

            {selected === "savedPosts" && (
              <>
                {savedPostsInfo.map((item) => (
                  <NewPostCard
                    key={item.id}
                    item={item}
                    onDelete={handleDeleteClicked}
                    onSaved={handleSavedClicked}
                    onPress={handlePostClicked}
                    showSave={false}
                  />
                ))}
              </>
            )}
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
  radioButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  radioButton: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    width: 150,
    alignItems: "center",
  },
  radioButtonActive: {
    backgroundColor: COLORS.primary,
  },
  radioButtonText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  radioButtonTextActive: {
    color: "#fff",
  },
});

export default ProfileScreen;
