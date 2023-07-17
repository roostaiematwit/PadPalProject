import React, { useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import stylesGlobal from "../styles/styles";
import { auth } from "../firebase";

import { COLORS } from "../styles/theme";
import { db } from "../firebase";
import { AuthContext } from "../navigation/AuthProvider";
import { doc, setDoc } from "firebase/firestore";


const ICON_TYPE = "font-awesome";
const ERROR_TITLE = "Error";

export default RegisterScreen = (props) => {
  const [user, setUser] = useState({ username: "", name: "", email: "" });
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { register } = useContext(AuthContext);

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
    console.log("Registering ", user.name, " as ", user.email);
    register(user.email, password, user.username, user.name);
  };

  //Firestore Functions -- UNUSED
  const addUser = async () => {
    await setDoc(doc(db, "users", user.email), {
      email: user.email,
      name: user.name,
      username: user.username,
    });
  };

  return (
    <View style={styles.container}>
    <ScrollView>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -300}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create an Account</Text>
          <Input
            placeholder="Username"
            autoCapitalize="none"
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
            autoCapitalize="none"
            leftIcon={{ type: ICON_TYPE, name: "envelope" }}
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
            onPress={onRegister}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
    backgroundColor: COLORS.background,
  },
  formContainer: {
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 15,
    color: COLORS.primary,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    paddingLeft: 10,
    color: COLORS.primary,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 50,
  },
  createTitle: {
    color: COLORS.white,
  },
});
