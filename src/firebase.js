// 필요한 기능 가져오기
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC6rtE7G_VETeVKyTtgKCd1i67Z5hVq74",
  authDomain: "pwa-to-do-97186.firebaseapp.com",
  databaseURL: "https://pwa-to-do-97186-default-rtdb.firebaseio.com",
  projectId: "pwa-to-do-97186",
  storageBucket: "pwa-to-do-97186.appspot.com",
  messagingSenderId: "233036299477",
  appId: "1:233036299477:web:38d89ca922271c089b365c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);