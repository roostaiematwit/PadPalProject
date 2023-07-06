import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { COLORS } from "../assets/constants/theme";

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        alert("Logged in with: " + user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={{ marginBottom: 130 }}>
        <Input
          placeholder="Email"
          leftIcon={{ type: "font-awesome", name: "user" }}
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={setEmail}
          value={email}
        />
        <Input
          placeholder="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          secureTextEntry
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={setPassword}
          value={password}
        />
        <Button
          title="Login"
          buttonStyle={styles.loginButton}
          onPress={onSignIn}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Register")}
          >
            <Text style={styles.createButton}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: COLORS.background,
    ...StyleSheet.absoluteFill,
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  createButton: {
    color: COLORS.tertiary,
  },
});
