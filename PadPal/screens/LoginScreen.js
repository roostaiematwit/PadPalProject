import React, { useState, useContext } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { COLORS } from "../styles/theme";
import stylesGlobal from "../styles/styles";
import { AuthContext } from "../navigation/AuthProvider";

export default function LoginScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const onSignIn = () => {
    console.log("Sign in clicked");
    login(email, password);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/PPTemplogo.png")}
            style={styles.logo}
          />
          <Text style={{ ...stylesGlobal.title, bottom: -3 }}>PadPal</Text>
        </View>

        <View>
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
          <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.signUpView}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Register")}
            >
              <Text style={styles.singUpText}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.background,
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    padding: 30,
    marginBottom: 15,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: "cover",
    alignSelf: "center",
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
  forgotButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  forgotText: {
    color: COLORS.tertiary,
    fontWeight: "500",
  },
  signUpView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  singUpText: {
    color: COLORS.tertiary,
    fontWeight: "500",
  },
});
