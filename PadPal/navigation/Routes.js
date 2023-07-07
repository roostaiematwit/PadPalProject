import React, { useEffect, useState, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../firebase";
import { AuthContext } from "./AuthProvider";
import { useFonts } from "expo-font";
import Landing from "./Landing";

export default Routes = () => {
  //Load custom fonts
  const [fontsLoaded] = useFonts({
    LogoFont: require("../assets/fonts/Typo_Round_Bold_Demo.otf"),
  });

  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    console.log("user", user, " has logged in");
    setUser(user);
    if (initializing) setInitializing(false);
  };

  // Listen for authentication state to change.
  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      onAuthStateChanged(user);
    });
    return subscriber;
  }, []);

  // Check if fonts are loaded
  if (!fontsLoaded) {
    return undefined;
  }

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Landing user={user} />
    </NavigationContainer>
  );
};
