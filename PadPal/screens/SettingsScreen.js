import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Icon } from "react-native-elements";

const list = [
  {
    title: "Notifications",
    icon: "notifications",
  },
  {
    title: "Profile",
    icon: "account-circle",
  },
  // ... add more settings options
];

const SettingsScreen = () => {
  return (
    <View>
      {list.map((item, i) => (
        <ListItem key={i} bottomDivider>
          <Icon name={item.icon} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
    </View>
  );
};

export default SettingsScreen;
