import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import stylesGlobal from "../styles";

const ProfileScreen = () => {
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.text}>ProfileScreen</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  innerContainer: {
    ...stylesGlobal.innerContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
});
