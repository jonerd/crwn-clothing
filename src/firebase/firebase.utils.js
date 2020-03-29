import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyB0E3ae6ZB_hP0xPVHHS0LJV8JclAio1tg",
  authDomain: "crwn-db-ad2a1.firebaseapp.com",
  databaseURL: "https://crwn-db-ad2a1.firebaseio.com",
  projectId: "crwn-db-ad2a1",
  storageBucket: "crwn-db-ad2a1.appspot.com",
  messagingSenderId: "184435244269",
  appId: "1:184435244269:web:09589f21ed3b417ea120e4"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
