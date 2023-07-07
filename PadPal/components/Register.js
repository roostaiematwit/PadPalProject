import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import stylesGlobal from "../assets/styles";
import { auth } from "../firebase";

import { COLORS } from "../assets/constants/theme";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const ICON_TYPE = "font-awesome";
const ERROR_TITLE = "Error";

export default RegisterScreen = (props) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [user, setUser] = useState({ username: "", name: "", email: "" });

  //Error Checking
  const validateFields = () => {
    const { username, name, email } = user;
    if (
      name.length === 0 ||
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      Alert.alert(ERROR_TITLE, "Please fill in all fields.", [{ text: "OK" }]);
      return false;
    }
    if (password.length < 6) {
      Alert.alert(ERROR_TITLE, "Password must be more than 6 characters", [
        { text: "OK" },
      ]);
      return false;
    }
    if (password !== passwordConfirm) {
      Alert.alert(ERROR_TITLE, "The passwords do not match.", [{ text: "OK" }]);
      return false;
    }

    return true;
  };

  const onRegister = () => {
    if (!validateFields()) {
      return;
    }

    createUserWithEmailAndPassword(auth, user.email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registered with: " + user.email);
        addUser();
      })
      .catch((error) => alert(error.message));
  };

  const addUser = () => {
    const userDb = collection(db, "users");
    addDoc(userDb, {
      username: user.username,
      name: user.name,
      email: user.email,
    });
  };

  return (
    <View style={styles.screen}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Input
            placeholder="Username"
            leftIcon={{ type: ICON_TYPE, name: "user" }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onChangeText={(text) => setUser({ ...user, username: text })}
            value={user.username}
          />
          <Input
            placeholder="Name"
            leftIcon={{ type: ICON_TYPE, name: "user" }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onChangeText={(text) => setUser({ ...user, name: text })}
            value={user.name}
          />
          <Input
            placeholder="Email"
            leftIcon={{ type: ICON_TYPE, name: "user" }}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onChangeText={(text) => setUser({ ...user, email: text })}
            value={user.email}
          />
          <Input
            placeholder="Password"
            leftIcon={{ type: ICON_TYPE, name: "lock" }}
            secureTextEntry
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Input
            placeholder="Confirm Password"
            leftIcon={{ type: ICON_TYPE, name: "lock" }}
            secureTextEntry
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
            onChangeText={(text) => setPasswordConfirm(text)}
            value={passwordConfirm}
          />
          <Button
            title="Create Account"
            type="outline"
            buttonStyle={styles.createButton}
            titleStyle={styles.createTitle}
            onPress={() => onRegister()}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  container: {
    ...stylesGlobal.container,
    justifyContent: "center",
    padding: 25,
    marginBottom: 100,
    backgroundColor: COLORS.background,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    paddingLeft: 10,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  createTitle: {
    color: COLORS.white,
  },
});
