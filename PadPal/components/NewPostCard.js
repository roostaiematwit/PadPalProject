import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useContext } from "react";
import {
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  Interaction,
  InteractionWrapper,
  InteractionText,
  Divider,
} from "../styles/FeedStyles";
import { AuthContext } from "../navigation/AuthProvider";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import moment from "moment/moment";
//import ProfilePicture from "./ProfilePicture";
import { Platform } from "react-native";


const NewPostCard = ({ item, onDelete }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  savedIcon = item.saved ? "heart" : "heart-outline";
  savedIconColor = item.saved ? COLORS.primary : "#333";

  if (item.saves == 1) {
    savesText = "1 Save";
  } else if (item.saves > 1) {
    savesText = item.saves + " Saves";
  } else {
    savesText = " Save";
  }

  const getUser = async () => {
    try {
      const docRef = doc(db, "users", item.userId);
      const userEntry = await getDoc(docRef);
      if (userEntry.exists()) {
        console.log("Document data:", userEntry.data());
        setUserData(userEntry.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  useState(() => {
    getUser();
  }, []);

  return (
    <Card style={styles.card}>
      <UserInfo>
        {/* <UserImg source={{ uri: item.userImg }} /> */}
        <ProfilePicture name={userData ? userData.name : ""} size={55} />
        <UserInfoText>
          <UserName> {userData ? userData.name : "Test"}</UserName>
          <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg != null ? (
        <PostImg source={{ uri: item.postImg }} />
      ) : (
        <Divider />
      )}

      <InteractionWrapper>
        <Interaction active={item.saved}>
          <Ionicons name={savedIcon} size={25} color={savedIconColor} />
          <InteractionText active={item.saved}>{savesText}</InteractionText>
        </Interaction>
        <Interaction>
          <Ionicons name="md-chatbubble-outline" size={25} color="#333" />
          <InteractionText>Contact</InteractionText>
        </Interaction>
        {/* <Interaction>
          <Ionicons name="md-share-social-outline" size={25} color="#333" />
        </Interaction> */}

        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} color="#333" />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>

    // THIS IS THE REACT NATIVE VERSION OF IT, I WAS WORKING ON FIRST
    //     <View style={styles.card}>
    //       <View style={styles.userInfo}>
    //         <Image source={item.userImg} style={styles.userImg} />
    //         <View style={styles.userInfoText}>
    //           <Text style={styles.userName}>{item.userName}</Text>
    //           <Text style={styles.postTime}>{item.postTime}</Text>
    //         </View>
    //       </View>
    //       <Text style={styles.postText}>{item.post}</Text>
    //       {item.postImg != "none" ? (
    //         <Image source={item.postImg} style={styles.postImg} />
    //       ) : (
    //         <View style={styles.divider} />
    //       )}

    //       <View style={styles.interactionWrapper}>
    //         <TouchableOpacity
    //           style={item.saved ? styles.activeInteraction : styles.interaction}
    //         >
    //           <Ionicons name={savedIcon} size={25} color={savedIconColor} />
    //           <Text
    //             style={
    //               item.saved ? styles.activeInteractionText : styles.interactionText
    //             }
    //           >
    //             {savesText}
    //           </Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity style={styles.interaction}>
    //           <Ionicons name="md-chatbubble-outline" size={25} color="#333" />
    //           <Text style={styles.interactionText}>Contact</Text>
    //         </TouchableOpacity>
    //       </View>
    //     </View>
  );
};

export default NewPostCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#E7E7E7",
    width: "100%",
    marginBottom: 20,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.4)",
        shadowOpacity: 0.8,
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 3,
        },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  userInfoText: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 10,
  },
  postTime: {
    fontSize: 12,
    color: "#666",
  },
  postText: {
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },
  postImg: {
    width: "100%",
    height: 250,
    marginTop: 15,
  },
  divider: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    width: "92%",
    alignSelf: "center",
    marginTop: 15,
  },
  interactionWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },
  interaction: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 5,
  },
  interactionActive: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    padding: 2,
    paddingHorizontal: 5,
    backgroundColor: COLORS.secondary,
  },
  interactionText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
    marginLeft: 5,
  },
  interactionTextActive: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 5,
    marginLeft: 5,
  },
});
