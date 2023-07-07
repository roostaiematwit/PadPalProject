import { useFonts } from "expo-font";
import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  View,
  Text,
  StatusBar,
  Dimensions,
  FlatList,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./assets/navigation/tabs";
import PadPalAnimation from "./assets/animations/PadPalAnimation";
import stylesGlobal from "./assets/styles";

//NEW CODE
import RegisterScreen from "./components/Register";
import LoginScreen from "./components/Login";
import { auth } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const Stack = createNativeStackNavigator();

export default function App() {
  //Load custom fonts
  const [fontsLoaded] = useFonts({
    LogoFont: require("./assets/fonts/Typo_Round_Bold_Demo.otf"),
  });

  //Opening Animation
  const [isAnimating, setIsAnimating] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { height } = Dimensions.get("window");
  const contentOpacity = useRef(new Animated.Value(0)).current;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  //Experiment firebase
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const usersQuery = collection(db, "users");
    onSnapshot(usersQuery, (snapshot) => {
      let usersList = [];
      snapshot.docs.map((doc) => usersList.push({ ...doc.data(), id: doc.id }));
      setPeople(usersList);
      setLoading(false);
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.username}</Text>
      </View>
    );
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setLoaded(true);
      }
    });
    return unsubscribe;
  }, []);

  // Animation to have screen fade in after opening animation
  useEffect(() => {
    return () => {
      console.log("Animation done");
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }).start();
    };
  }, [isAnimating]);

  if (!fontsLoaded) {
    return undefined;
  }

  // Change state depending on if user is logged in or not
  const state = () => {
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!isLoggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    );
  };

  // APP wrapper
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#000" : "#fff" }}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />

      <View style={stylesGlobal.padPalContainer}>
        {isAnimating ? (
          <PadPalAnimation
            isAnimating={isAnimating}
            setIsAnimating={setIsAnimating}
            ScreenHeight={height}
          />
        ) : (
          <>
            <Text style={{ ...stylesGlobal.title, bottom: -3 }}>PadPal</Text>
            <Animated.View
              style={{
                flex: 1,
                opacity: contentOpacity,
                backgroundColor: "#fff",
              }}
            >
              {state()}
              {/* <View
                style={{
                  justifyContent: "center",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Text> Hello Its me </Text>
                <FlatList
                  data={people}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View> */}
            </Animated.View>
          </>
        )}
      </View>
    </View>
  );
}

const styles = {
  container: {
    borderWidth: 1,
    borderColor: "red",
  },
};
