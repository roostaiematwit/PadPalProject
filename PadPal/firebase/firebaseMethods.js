import {
  doc,
  getDoc,
  query,
  collection,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

export const getUser = async (userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const userEntry = await getDoc(docRef);
    if (userEntry.exists()) {
      console.log("Document data:", userEntry.data());
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

export const getPosts = (userId) => {
  return new Promise((resolve, reject) => {
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

    const postsList = [];

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { userId, post, postImg, postTime, saves } = doc.data();
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
            saves: "0",
          });
        });
        const ids = postsList.map((post) => post.id);
        console.log("Post IDs: ", ids);
        resolve({ postsList, unsubscribe });
      },
      (error) => {
        reject(error);
      }
    );
  });
};
