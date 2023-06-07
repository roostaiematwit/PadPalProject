import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import stylesGlobal from "../styles";

const MakePostScreen = () => {
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.text}>MakePostScreen</Text>
    </View>
  );
};

export default MakePostScreen;

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
