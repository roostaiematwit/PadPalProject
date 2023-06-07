import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PostsScreen from "./assets/screens/PostsScreen";
import HomeScreen from "./assets/screens/HomeScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    LogoFont: require("./assets/fonts/Typo_Round_Bold_Demo.otf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

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
