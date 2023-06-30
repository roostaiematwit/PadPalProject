import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Input, Button, ThemeProvider, Icon } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";

const theme = {
  colors: {
    primary: "#884dff",
  },
};

const MakePosts = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("");
  const [people, setPeople] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = () => {
    if (title && content && address && people && price && date) {
      const post = {
        id: Math.random(),
        user: "Current User",
        image: image || "https://example.com/default.jpg",
        title,
        content,
        address,
        people,
        price,
        date,
        likes: 0,
      };

      onAddPost(post);

      setTitle("");
      setImage("");
      setContent("");
      setAddress("");
      setPeople("");
      setPrice("");
      setDate(new Date());
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Input
            placeholder="Enter Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            leftIcon={{ type: "material-community", name: "format-title" }}
          />
          <Input
            placeholder="Enter Image URL (optional)"
            value={image}
            onChangeText={(text) => setImage(text)}
            leftIcon={{ type: "material", name: "image" }}
          />
          <Input
            placeholder="Enter Address"
            value={address}
            onChangeText={(text) => setAddress(text)}
            leftIcon={{ type: "material", name: "place" }}
          />
          <Input
            placeholder="Enter # of People"
            value={people}
            onChangeText={(text) => setPeople(text)}
            keyboardType="numeric"
            leftIcon={{ type: "material-community", name: "account-multiple" }}
          />
          <Input
            placeholder="Enter Average Cost per Person"
            value={price}
            onChangeText={(text) => setPrice(text)}
            keyboardType="numeric"
            leftIcon={{ type: "material-community", name: "cash" }}
          />
          <DateTimePicker
            value={date}
            onChange={(event, selectedDate) => setDate(selectedDate)}
            mode="date"
            display="default"
          />
          <Input
            placeholder="Enter content"
            value={content}
            onChangeText={(text) => setContent(text)}
            multiline={true}
            numberOfLines={4}
            leftIcon={{ type: "material-community", name: "text-box" }}
          />
          <Button
            title="Post"
            onPress={handleSubmit}
            icon={
              <Icon
                name="send"
                size={20}
                color="white"
                type="material"
                style={{ marginRight: 10 }}
              />
            }
          />
        </View>
      </TouchableWithoutFeedback>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default MakePosts;
