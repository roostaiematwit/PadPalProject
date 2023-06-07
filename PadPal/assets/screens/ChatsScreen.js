import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import stylesGlobal from "../styles";

const ChatsScreen = () => {
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.text}>ChatsScreen</Text>
    </View>
  );
};

export default ChatsScreen;

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
