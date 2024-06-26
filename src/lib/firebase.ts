import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAx0FFiwmu0-wT9ZvNAHGURYdbHcKSYOxA",
  authDomain: "expencetraker-a5a67.firebaseapp.com",
  projectId: "expencetraker-a5a67",
  storageBucket: "expencetraker-a5a67.appspot.com",
  messagingSenderId: "998709185593",
  appId: "1:998709185593:web:bee933a18db3aad6ea11e8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)