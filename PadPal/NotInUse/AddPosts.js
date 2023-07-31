import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import stylesGlobal from "../styles/styles";
import { useTheme } from "react-native-paper";

export default AddPosts = ({ onAddPost }) => {
  const theme = useTheme();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handlePost = () => {
    if (title !== "" && content !== "") {
      const newPost = {
        id: Math.random(),
        user: "Current User",
        image: image !== "" ? image : "https://example.com/default.jpg", // Replace with default image if no image URL is provided
        title: title,
        text: content,
        likes: 0,
      };

      //Add new post to the existing posts array
      onAddPost(newPost);

      //Reset the title and content
      setTitle("");
      setContent("");
      setImage("");
    } else {
      alert("Please enter a title and content");
    }

    //dismiss the keyboard
    Keyboard.dismiss();
  };

  return (
    <>
      <Text
        style={{
          ...stylesGlobal.title,
          padding: 10,
          color: "black",
        }}
      >
        Make a Post
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter image url"
        value={image}
        onChangeText={setImage}
      />

      <TextInput
        style={styles.textArea}
        multiline={true}
        numberOfLines={4}
        placeholder="Enter content"
        value={content}
        onChangeText={setContent}
      />

      <TouchableOpacity
        style={{ ...styles.button, backgroundColor: theme.colors.primary }}
        onPress={handlePost}
      >
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
  },
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
  },
  button: {
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
