//Library imports
import { Animated, View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from "react";

//Custom imports
import stylesGlobal from "../styles/styles";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";

//FirebaseExperiment imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Stack = createNativeStackNavigator();

const firebaseExperiment = () => {
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

  return (
    <View
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
    </View>
  );
};

export default AuthStack = () => {
  const contentOpacity = useRef(new Animated.Value(0)).current;

  //Fade in animation
  useEffect(() => {
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ flex: 1, opacity: contentOpacity }}>
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
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: stylesGlobal.showBorder,
  },
});
