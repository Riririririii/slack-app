import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDzL1uZdwl0MIvfB2nlQArIFFUV31hMzko",
  authDomain: "slack-app-d980c.firebaseapp.com",
  databaseURL: "https://slack-app-d980c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "slack-app-d980c",
  storageBucket: "slack-app-d980c.appspot.com",
  messagingSenderId: "408120456462",
  appId: "1:408120456462:web:4c58518bc07c5aa3a6535f",
  measurementId: "G-CY2JTYZKZH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()

