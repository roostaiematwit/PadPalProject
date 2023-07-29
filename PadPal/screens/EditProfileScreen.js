import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Avatar, Text, Button, Card, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTheme } from "react-native-paper";
import stylesGlobal, { showBorder } from "../styles/styles";
import { AuthContext } from "../navigation/AuthProvider";
import { db, storage } from "../firebase";
import { doc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../firebase/firebaseMethods";

const EditProfileScreen = () => {
  const theme = useTheme();
  const { user, logout } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUser(user.uid);
      setUserInfo(fetchedUser);
    };
    fetchUser();

    setTimeout(() => {
      setName(userInfo.name);
      setUsername(userInfo.username);
    }, 500);
  }, []);

  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        email: userInfo.email,
        name: userInfo.name,
        userId: user.uid,
        username: userInfo.username,
      });
      console.log("User Info Updated");
      navigation.navigate("UserProfile", { screen: "Profile" });
    } catch (error) {
      console.log("Error updating user info:", error);
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.centeredContainer}>
          <Avatar
            rounded
            size={100}
            title={userInfo?.name?.substring(0, 1)}
            containerStyle={styles.avatarContainer}
          />
          <Input
            placeholder="Name"
            autoCorrect={false}
            leftIcon={{ type: "font-awesome", name: "user" }}
            value={userInfo ? userInfo.name : ""}
            onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
          />
          <Input
            placeholder="Username"
            autoCorrect={false}
            leftIcon={{ type: "font-awesome", name: "at" }}
            value={userInfo ? userInfo.username : ""}
            onChangeText={(text) =>
              setUserInfo({ ...userInfo, username: text })
            }
          />
          <Input
            placeholder="Location"
            autoCorrect={true}
            leftIcon={{ type: "material", name: "place" }}
            //value={location}
            //onChangeText={setLocation}
          />
          <Input
            placeholder="Phone"
            keyboardType="numeric"
            leftIcon={{ type: "font-awesome", name: "phone" }}
            //value={phone}
            //onChangeText={setPhone}
          />
          <Button
            title="Update Profile"
            buttonStyle={{
              ...styles.editButton,
              backgroundColor: theme.colors.primary,
            }}
            onPress={handleUpdate}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 15,
  },
  centeredContainer: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    backgroundColor: "#e62929",
    marginBottom: 20,
  },
  editButton: {
    marginHorizontal: 30,
    marginVertical: 20,
    width: 300,
  },
});

export default EditProfileScreen;
