import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../styles/theme";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useContext } from "react";
import {
  Card,
  UserInfo,
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
import moment from "moment/moment";
import ProfilePicture from "./ProfilePicture";
import { Platform } from "react-native";
import { getUser } from "../firebase/firebaseMethods";

const NewPostCard = ({
  item,
  onDelete,
  onSaved,
  onPress,
  showSave = true,
  showContact = true,
}) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [isSaved, setIsSaved] = useState(item.saved);
  savedIcon = isSaved ? "heart" : "heart-outline";
  savedIconColor = isSaved ? COLORS.primary : "#333";

  if (item.saves == 1) {
    savesText = "1 Save";
  } else if (item.saves > 1) {
    savesText = item.saves + " Saves";
  } else {
    savesText = " Save";
  }

  useEffect(() => {
    const fetchUserData = async () => {
      if (item && item.userId) {
        const user = await getUser(item.userId);
        setUserData(user);
      }
    };
    fetchUserData();
  }, [item]);

  // Function to handle save
  const handleSave = async (id) => {
    await onSaved(id);
    setIsSaved((prev) => !prev); // Toggle 'saved' state
  };

  return (
    <Card>
      <TouchableOpacity onPress={() => onPress(item.userId)}>
        <UserInfo>
          <ProfilePicture name={userData ? userData.name : ""} size={55} />
          <UserInfoText>
            <UserName> {userData ? userData.name : "Test"}</UserName>
            <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
          </UserInfoText>
        </UserInfo>
      </TouchableOpacity>
      <PostText>{item.post}</PostText>
      {item.postImg != null ? (
        <PostImg source={{ uri: item.postImg }} />
      ) : (
        <Divider />
      )}

      <InteractionWrapper>
        {showSave ? (
          <Interaction active={isSaved} onPress={() => handleSave(item.id)}>
            <Ionicons name={savedIcon} size={25} color={savedIconColor} />
            <InteractionText active={isSaved}>{savesText}</InteractionText>
          </Interaction>
        ) : (
          <>
            <InteractionText> {savesText}</InteractionText>
          </>
        )}
        {showContact ? (
          <Interaction>
            <Ionicons name="md-chatbubble-outline" size={25} color="#333" />
            <InteractionText>Contact</InteractionText>
          </Interaction>
        ) : null}

        {user.uid == item.userId ? (
          <Interaction onPress={() => onDelete(item.id)}>
            <Ionicons name="md-trash-bin" size={25} color="#333" />
          </Interaction>
        ) : null}
      </InteractionWrapper>
    </Card>
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
