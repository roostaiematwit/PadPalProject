import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import { ListItem, Icon } from "react-native-elements";
import stylesGlobal from "../styles/styles";
import { useContext } from "react";
import { AuthContext } from "../navigation/AuthProvider";
import { COLORS } from "../styles/theme";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const list = [
    {
      title: "Profile",
      icon: "account-circle",
      onPress: () =>
        navigation.navigate("UserProfile", { screen: "EditProfile" }),
    },
    // ... add more settings options
  ];
  return (
    <View>
      {list.map((item, i) => (
        <ListItem onPress={item.onPress} key={i} bottomDivider topDivider>
          <Icon name={item.icon} />
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ))}
      <Button
        title="Logout"
        buttonStyle={{
          ...styles.editButton,
          backgroundColor: COLORS.primary,
        }}
        onPress={() =>
          Alert.alert("Confirmation", "Are you sure you want to logout?", [
            { text: "Yes", onPress: () => logout() },
            { text: "No" },
          ])
        }
      />
    </View>
  );
};

export default SettingsScreen;
const { showBorder } = stylesGlobal;

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
