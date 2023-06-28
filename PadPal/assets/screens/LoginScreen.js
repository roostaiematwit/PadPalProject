import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import stylesGlobal from "../styles";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Tabs");
        console.log("Teleporitng Home");
      } else {
        console.log("Teleporting to Login");
      }
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Logged in with: " + user.email);
        // ...
      })
      .catch((error) => alert(error.message));
  };

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Registered in with: " + user.email);
        // ...
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View>
        <Input
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "user" }}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          secureTextEntry
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <Button
          title="Login"
          buttonStyle={styles.loginButton}
          onPress={handleLogin}
        />
        <Text style={styles.or}>or</Text>
        <Button
          title="Create Account"
          type="outline"
          buttonStyle={styles.createButton}
          titleStyle={styles.createTitle}
          onPress={handleCreateAccount}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...stylesGlobal.container,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 50,
    textAlign: "center",
    color: "#444",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: "#841584",
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  or: {
    textAlign: "center",
    marginBottom: 15,
    color: "#444",
  },
  createButton: {
    borderColor: "#841584",
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 50,
  },
  createTitle: {
    color: "#841584",
  },
});

export default LoginScreen;
