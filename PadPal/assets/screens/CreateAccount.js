import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View, Alert } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import stylesGlobal from "../styles";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Tabs");
        console.log("Teleporting Home");
      } else {
        console.log("Teleporting to Login");
      }
    });
    return unsubscribe;
  }, []);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("Registered with: " + user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={{marginBottom: 130}}>
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
        <Input
          placeholder="Confirm Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          secureTextEntry
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={(text) => setPasswordConfirm(text)} // Check for same password
          value={passwordConfirm}
        />
        <Button
          title="Create Account"
          type="outline"
          buttonStyle={styles.createButton}
          titleStyle={styles.createTitle}
          onPress={() => {
            console.log("Create button pressed");
            if (password === passwordConfirm) {
                handleCreateAccount();
                console.log("Account created");
            }
            else {
                Alert.alert('Error', 'The passwords do not match.', [{ text: 'OK' }]);
                console.log("Passwords do not match");
            }
          }}
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
    flex: 1,
  },
  title: {
    marginBottom: 50,
    textAlign: "center",
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 30,
  },
  input: {
    paddingLeft: 10,
  },
  createButton: {
    backgroundColor: "#841584",
    paddingVertical: 15,
    borderRadius: 50,
    marginBottom: 15,
  },  
  createTitle: {
    color: "#fff",
  },
});

export default CreateAccount;
