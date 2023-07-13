import React, { useEffect, useState, useContext } from "react";
import { Text, Image } from "react-native";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
  DeleteImageButton,
  AddImageWrapper,
} from "../styles/AddPost";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from "../styles/theme";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase, db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { AuthContext } from "../navigation/AuthProvider";

const MakePosts = ({ onAddPost }) => {
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [progress, setProgress] = useState(0);

  //Get Camera and Gallery Permissions
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  // Submit entire post to firestore
  const submitPost = async () => {
    if (!post || post.trim() === "") {
      Alert.alert("Error", "Please enter a post");
      return;
    }
    const imageUrl = await uploadImage();
    if (imageUrl === undefined) {
      Alert.alert("Error", "Something went wrong uploading your image");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        userId: user.uid,
        post: post,
        postImg: imageUrl,
        postTime: Timestamp.fromDate(new Date()),
        saves: null,
      })
        .then(() => {
          setPost(null);
          console.log("Post successfully written!");
          Alert.alert(
            "File uploaded",
            "Your file has been uploaded successfully"
          );
        })
        .catch((error) => {
          console.error(
            "Something went wrong adding post to firestore: ",
            error
          );
        });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const uploadImage = async () => {
    /////////////////////////////////////////
    //May be broken, because i changed it lol
    /////////////////////////////////////////

    if (image == null) return null;

    const { uri } = image;
    let filename = uri.substring(uri.lastIndexOf("/") + 1);

    setUploading(true);

    try {
      const uploadResponse = await uploadToFirebase(uri, filename, (progress) =>
        setProgress(progress)
      );
      console.log(uploadResponse);
      setImage(null);
      setProgress(0);
      return uploadResponse.downloadUrl;
    } catch (e) {
      console.log("error uploading img " + e.message);
    }
    setUploading(false);
  };

  const takePhoto = async () => {
    if (hasCameraPermission === false) {
      alert("Access to camera is required!");
      return;
    }
    const cameraResp = await ImagePicker.launchCameraAsync({
      cropping: true,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!cameraResp.canceled) {
      const image = cameraResp.assets[0];
      const uri = image.uri;
      console.log(
        " \n======\nAdded " +
          uri.substring(uri.lastIndexOf("/") + 1) +
          " to post\n======="
      );
      setImage(image);
    }
  };

  const pickImage = async () => {
    if (hasGalleryPermission === false) {
      alert("Access to photos is required!");
      return;
    }
    const cameraGal = await ImagePicker.launchImageLibraryAsync({
      cropping: true,
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });

    if (!cameraGal.canceled) {
      const image = cameraGal.assets[0];
      const uri = image.uri;
      console.log(
        " \n======\nAdded " +
          uri.substring(uri.lastIndexOf("/") + 1) +
          " to post\n======="
      );
      setImage(image);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <InputWrapper>
          {image !== null ? (
            <AddImageWrapper>
              <AddImage source={{ uri: image.uri }} />
              <DeleteImageButton onPress={() => setImage(null)}>
                <Icon name="close-circle" size={30} color="gray" />
              </DeleteImageButton>
            </AddImageWrapper>
          ) : null}
          <InputField
            placeholder="Let me see that room ;)"
            multiline
            numberOfLines={4}
            value={post}
            onChangeText={(content) => setPost(content)}
          />
          {uploading ? (
            <StatusWrapper>
              <Text>{progress} % Completed!</Text>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </StatusWrapper>
          ) : (
            <SubmitBtn
              onPress={() => {
                submitPost();
              }}
            >
              <SubmitBtnText>Post</SubmitBtnText>
            </SubmitBtn>
          )}
        </InputWrapper>

        <ActionButton buttonColor={COLORS.primary} buttonText="+">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Take Photo"
            onPress={() => takePhoto()}
          >
            <Icon name="camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Choose Photo"
            onPress={() => {
              pickImage();
            }}
          >
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default MakePosts;

// return (
//   <ThemeProvider theme={theme}>
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <View style={styles.container}>
//         <Input
//           placeholder="Enter Title"
//           value={title}
//           onChangeText={(text) => setTitle(text)}
//           leftIcon={{ type: "material-community", name: "format-title" }}
//         />
//         <Input
//           placeholder="Enter Image URL (optional)"
//           value={image}
//           onChangeText={(text) => setImage(text)}
//           leftIcon={{ type: "material", name: "image" }}
//         />
//         <Input
//           placeholder="Enter Address"
//           value={address}
//           onChangeText={(text) => setAddress(text)}
//           leftIcon={{ type: "material", name: "place" }}
//         />
//         <Input
//           placeholder="Enter # of People"
//           value={people}
//           onChangeText={(text) => setPeople(text)}
//           keyboardType="numeric"
//           leftIcon={{ type: "material-community", name: "account-multiple" }}
//         />
//         <Input
//           placeholder="Enter Average Cost per Person"
//           value={price}
//           onChangeText={(text) => setPrice(text)}
//           keyboardType="numeric"
//           leftIcon={{ type: "material-community", name: "cash" }}
//         />
//         <DateTimePicker
//           value={date}
//           onChange={(event, selectedDate) => setDate(selectedDate)}
//           mode="date"
//           display="default"
//         />
//         <Input
//           placeholder="Enter content"
//           value={content}
//           onChangeText={(text) => setContent(text)}
//           multiline={true}
//           numberOfLines={4}
//           leftIcon={{ type: "material-community", name: "text-box" }}
//         />
//         <Button
//           title="Post"
//           onPress={handleSubmit}
//           icon={
//             <Icon
//               name="send"
//               size={20}
//               color="white"
//               type="material"
//               style={{ marginRight: 10 }}
//             />
//           }
//         />
//       </View>
//     </TouchableWithoutFeedback>
//   </ThemeProvider>
// );
