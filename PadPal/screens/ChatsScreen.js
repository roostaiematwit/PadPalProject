import React from "react";
import stylesGlobal from "../styles/styles";
import { View, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const list = [
  {
    name: "Marco",
    avatar_url: "https://example.com/avatar2.jpg",
    subtitle:
      "Pedro, can we discuss your post about the apartment on x street!",
  },
  {
    name: "Nick",
    avatar_url: "https://example.com/avatar1.jpg",
    subtitle:
      "Hey, are you still looking for a roomate? I'm interested in the apartment on x street!",
  },

  // ... add more chats
];

const ChatsScreen = () => {
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <View>
      {list.map((chatList, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar
            rounded
            title={chatList.name[0]}
            containerStyle={{ backgroundColor: getRandomColor() }}
          />
          <ListItem.Content>
            <ListItem.Title>{chatList.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.subtitle}>
              {chatList.subtitle}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))}
    </View>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  subtitle: {
    color: "gray",
    fontSize: 16,
  },
});
