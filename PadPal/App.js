import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PostsScreen from "./assets/screens/PostsScreen";
import HomeScreen from "./assets/screens/HomeScreen";

export default function App() {
  return <PostsScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
