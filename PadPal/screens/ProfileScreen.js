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
import NewPostCard from "../components/NewPostCard";
import { useIsFocused } from "@react-navigation/native";
import { getUser, getPosts, deletePost } from "../firebase/firebaseMethods";

const ProfileScreen = () => {
  const theme = useTheme();
  const { user, logout } = useContext(AuthContext);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [postCount, setPostCount] = useState(0);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  //refreshes anytime there is an update to posts
  useEffect(() => {
    const unsubscribe = getPosts((postsList) => {
      setPosts(postsList);
      setPostCount(postsList.length);
      if (loading) {
        setLoading(false);
      }
    }, user.uid);

    // Clean up the subscription on unmount
    return () => unsubscribe && unsubscribe();
  }, []);

  //Refreshses everytime profile screen is focused
  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser(user.uid);
      setUserInfo(fetchedUser);
    };
    fetchUser();
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
