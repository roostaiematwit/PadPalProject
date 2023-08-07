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
  getDocs,
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
      throw new Error(`User document with ID ${userId} does not exist.`);
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

export const getPosts = (callback, userId, type) => {
  let q;

  if (type === "MYPOSTS") {
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
    async (querySnapshot) => {
      const postsList = [];

      // Fetch user data once before iterating over the posts
      const userData = await getUser(userId);
      const userSavedPosts = userData && userData.saves ? userData.saves : [];

      querySnapshot.forEach(async (doc) => {
        const { userId, post, postImg, postTime, saves } = doc.data();
        const isSaved = userSavedPosts.includes(doc.id);
        postsList.push({
          id: doc.id,
          userId: userId,
          userName: "Unknown",
          userImg:
            "https://firebasestorage.googleapis.com/v0/b/padpal-ba095.appspot.com/o/images%2F15CD67AB-C41A-41E6-A454-74922A6BE0E7.jpg?alt=media&token=096e0146-7fa2-458b-99c1-d7b3708fe50d",
          postTime: postTime,
          post: post,
          postImg: postImg,
          saved: isSaved,
          saves: saves,
        });
      });
      callback(postsList);
      // const ids = postsList.map((post) => post.id);
      // console.log("getPost IDs: ", ids);
    },
    (error) => {
      console.error("Error fetching posts: ", error);
    }
  );

  // Return the unsubscribe function so it can be used to clean up the subscription
  return unsubscribe;
};

export const savePost = async (postId, userId, save) => {
  const postRef = doc(db, "posts", postId);
  const userRef = doc(db, "users", userId);

  try {
    if (save) {
      // If the user is saving the post
      await updateDoc(postRef, {
        saves: increment(1),
      });
      await updateDoc(userRef, {
        saves: arrayUnion(postId),
      });
      console.log(`Post with ID ${postId} saved by user ${userId}.`);
    } else {
      // If the user is un-saving the post
      await updateDoc(postRef, {
        saves: increment(-1),
      });
      await updateDoc(userRef, {
        saves: arrayRemove(postId),
      });
      console.log(`Post with ID ${postId} un-saved by user ${userId}.`);
    }
    // If execution reached this line, operation was successful
    return true;
  } catch (error) {
    console.error(`Error saving or un-saving post with ID ${postId}:`, error);
    // In case of error, return false
    return false;
  }
};

// Returns true if the user has saved the post, false otherwise
export const userHasSavedPost = async (userId, postId) => {
  const userData = await getUser(userId);
  console.log("User data: ", userData);
  const userSavedPosts = userData && userData.saves ? userData.saves : [];
  return userSavedPosts.includes(postId);
};

export const subscribeToSavedPosts = (userId, handleNewData) => {
  const userRef = doc(db, "users", userId);

  const unsubscribeFromUser = onSnapshot(userRef, async (userSnap) => {
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const savedPostIds = userData.saves;

      // If there are no saved posts, return an empty array.
      if (!savedPostIds || savedPostIds.length === 0) {
        console.log("User has no saved posts.");
        handleNewData([]);
        return;
      }

      const postsCollectionRef = collection(db, "posts");
      const postsQuery = query(
        postsCollectionRef,
        where("__name__", "in", savedPostIds)
      );

      const unsubscribeFromPosts = onSnapshot(postsQuery, (postsSnapshot) => {
        const savedPosts = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("Saved posts retrieved successfully.");
        handleNewData(savedPosts);
      });

      // return function to unsubscribe from posts updates when not needed
      return unsubscribeFromPosts;
    } else {
      console.error(`User with ID ${userId} does not exist.`);
    }
  });

  // return function to unsubscribe from user updates when not needed
  return unsubscribeFromUser;
};

// Returns static list of saved posts
export const getSavedPosts = async (userId) => {
  const userRef = doc(db, "users", userId);

  try {
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const savedPostIds = userData.saves;

      // If there are no saved posts, return an empty array.
      if (!savedPostIds || savedPostIds.length === 0) {
        console.log("User has no saved posts.");
        return [];
      }

      const postsCollectionRef = collection(db, "posts");
      const postsQuery = query(
        postsCollectionRef,
        where("__name__", "in", savedPostIds)
      );

      const postsSnapshot = await getDocs(postsQuery);
      const savedPosts = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Saved posts retrieved successfully.");
      return savedPosts;
    } else {
      console.error(`User with ID ${userId} does not exist.`);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving saved posts:", error);
    return null;
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
      saves: 0,
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
