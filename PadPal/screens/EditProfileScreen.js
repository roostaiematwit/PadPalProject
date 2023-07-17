import React, {
    useContext,
    useState,
  } from "react";
  import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
  import { Avatar, Text, Button, Card, Input } from "react-native-elements";
  import Icon from "react-native-vector-icons/FontAwesome";
  import { useTheme } from "react-native-paper";
  import stylesGlobal, { showBorder } from "../styles/styles";
  import PostsList from "../components/PostsList";
  import { AuthContext } from "../navigation/AuthProvider";
  
  const EditProfileScreen = () => {
    const theme = useTheme();
    const { user, logout } = useContext(AuthContext);

    const { name, setName } = useState();

    return (
      <View style={stylesGlobal.innerContdainer}>
        <Input
          placeholder="Name"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={(text) => setUser({ ...user, username: text })}
        />
        <Input
          placeholder="Username"
          leftIcon={{ type: "font-awesome", name: "at" }}
        />
        <Input
          placeholder="Location"
          leftIcon={{ type: "material", name: "place" }}
        />
        <Input
          placeholder="Phone"
          keyboardType="numeric"
          leftIcon={{ type: "font-awesome", name: "phone" }}
        />
        <Input
          placeholder="Description"
          leftIcon={{ type: "font-awesome", name: "info-circle" }}
        />
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
  
  export default EditProfileScreen;
  