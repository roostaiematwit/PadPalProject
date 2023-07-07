import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { Avatar, Text, Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import stylesGlobal, { showBorder } from "../styles/styles";
import PostsList from "../components/PostsList";

const ProfileScreen = () => {
  const theme = useTheme();
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
                title={"PF"}
                containerStyle={{ backgroundColor: "gray" }}
              />
              <View style={{ marginLeft: 20 }}>
                <Text h4>Pedro Ferreira</Text>
                <Text h6 style={{ color: "grey" }}>
                  @PadPalAdmin
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.userBioSection}>
            <Text style={styles.description}>
              Pedro is a fire a developr no cap, he is a beast at coding and he
              is a menace to society!
            </Text>
          </View>

          <View style={styles.infoBoxWrapper}>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>Posts</Text>
              <Text h4 style={styles.infoBoxValue}>
                130
              </Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>Followers</Text>
              <Text h4 style={styles.infoBoxValue}>
                534
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
          />
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

    borderWidth: showBorder,
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
    width: "50%",
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
});

export default ProfileScreen;
