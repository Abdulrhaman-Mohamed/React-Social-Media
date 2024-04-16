
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfskUIEib0yI_YZVc_qxHhgorMbwcC7hA",
  authDomain: "react-social-8a3b7.firebaseapp.com",
  projectId: "react-social-8a3b7",
  storageBucket: "react-social-8a3b7.appspot.com",
  messagingSenderId: "832136964522",
  appId: "1:832136964522:web:20b1cf49bab3014fd263d3"
};

// Initialize Firebase
export const  app = initializeApp(firebaseConfig);
export const storage = getStorage(app)