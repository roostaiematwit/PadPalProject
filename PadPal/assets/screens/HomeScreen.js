import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import stylesGlobal from "../styles";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text style={stylesGlobal.title}>PadPal</Text>
      <View style={styles.container}>
        <Text style={styles.text}>HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 0,
    height: "90%",
  },
  text: {
    fontSize: 30,
  },
});
