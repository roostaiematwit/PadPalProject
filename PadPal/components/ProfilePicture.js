import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfilePicture = ({ name, size = 50, color, imageUrl }) => {
  const [backgroundColor, setBackgroundColor] = useState("#777");

  const firstLetter = name ? name[0].toUpperCase() : "";

  const generateRandomColor = () => {
    let letters = "6789ABCD";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 8)];
    }
    setBackgroundColor(color);
  };

  // Generate a new random color when the name prop changes.
  useEffect(() => {
    generateRandomColor();
  }, [name]);

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
      ]}
    >
      <Text style={[styles.text, { fontSize: size / 2 }]}>{firstLetter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});

export default ProfilePicture;
