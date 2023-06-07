import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import stylesGlobal from "../styles";

const HomeScreen = () => {
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.text}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

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
