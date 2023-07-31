import {
  doc,
  deleteDoc,
  addDoc,
  getDoc,
  query,
  collection,
  onSnapshot,
  orderBy,
  where,
  Timestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase";

// Returns user object from firestore
export const getUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const userEntry = await getDoc(docRef);
    if (userEntry.exists()) {
      // console.log("Document data:", userEntry.data());
      return userEntry.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log("Error fetching user:", error);
    return null;
  }
};

// Returns a post object from Firestore
export const getPost = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);
    const postSnapshot = await getDoc(postRef);
    if (postSnapshot.exists()) {
      console.log("Post data:", postSnapshot.data());
      return {
        id: postSnapshot.id,
        ...postSnapshot.data(),
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log("Error fetching post:", error);
    return null;
  }
};

export const getPosts = (callback, userId) => {
  let q;

  if (userId) {
    q = query(
      collection(db, "posts"),
      where("userId", "==", userId),
      orderBy("postTime", "desc")
    );
  } else {
    q = query(collection(db, "posts"), orderBy("postTime", "desc"));
  }

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot) => {
      const postsList = [];

      querySnapshot.forEach((doc) => {
        const { userId, post, postImg, postTime, saves, saved } = doc.data();
        postsList.push({
          id: doc.id,
          userId: userId,
          userName: "Test Name",
          userImg:
            "https://firebasestorage.googleapis.com/v0/b/padpal-ba095.appspot.com/o/images%2F15CD67AB-C41A-41E6-A454-74922A6BE0E7.jpg?alt=media&token=096e0146-7fa2-458b-99c1-d7b3708fe50d",
          postTime: postTime,
          post: post,
          postImg: postImg,
          saved: false,
          saves: saves,
        });
      });
      callback(postsList);
      const ids = postsList.map((post) => post.id);
      console.log("Post IDs: ", ids);
    },
    (error) => {
      console.error("Error fetching posts: ", error);
    }
  );

  // Return the unsubscribe function so it can be used to clean up the subscription
  return unsubscribe;
};

export const getSavedPosts = (callback, userId) => {};

export const savePost = async (postId, userId, save) => {
  const postRef = doc(db, "posts", postId);
  const userRef = doc(db, "users", userId);

  try {
    if (save) {
      // If the user is saving the post
      await updateDoc(postRef, {
        saves: increment(1),
        saved: true,
      });
      await updateDoc(userRef, {
        saves: arrayUnion(postId),
      });
      console.log(`Post with ID ${postId} saved.`);
    }
    //else {
    //   // If the user is un-saving the post
    //   await updateDoc(postRef, {
    //     saves: increment(-1),
    //     saved: false,
    //   });
    //   await updateDoc(userRef, {
    //     saves: arrayRemove(postId),
    //   });
    //   console.log(`Post with ID ${postId} un-saved.`);
    // }
  } catch (error) {
    console.error(`Error saving or un-saving post with ID ${postId}:`, error);
  }
};

//Delete post from firestore
export const deletePost = async (postId) => {
  const postRef = doc(db, "posts", postId);
  try {
    await deleteDoc(postRef);
    console.log(`Document with ID ${postId} deleted.`);
  } catch (error) {
    console.error(`Error deleting document with ID ${postId}:`, error);
  }
};

//Add post and Image to firestore
export const addPostToFirestore = async (userId, post, imageUrl) => {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      userId: userId,
      post: post,
      postImg: imageUrl,
      postTime: Timestamp.fromDate(new Date()),
      saves: null,
    });
    console.log("Post successfully written!");
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
};

//Upload image to firebase storage
export const uploadImageToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const blob = await fetchResponse.blob(); //blobl is what we want to upload to firebase

  const imageRef = ref(getStorage(), `images/${name}`);
  const uploadTask = uploadBytesResumable(imageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        onProgress && onProgress(progress);
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};
