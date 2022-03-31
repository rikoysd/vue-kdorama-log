import { initializeApp } from "firebase/app"; // firebaseをimport
import { getFirestore } from "firebase/firestore"; // getFirestoreでDBを取得

const firebaseConfig = {
  apiKey: "AIzaSyCK6r6EJcLAcoAQOpprxDMC8KmULzfsSqM",
  authDomain: "kdorama-log.firebaseapp.com",
  projectId: "kdorama-log",
  storageBucket: "kdorama-log.appspot.com",
  messagingSenderId: "722645462044",
  appId: "1:722645462044:web:9d8c61d3914badccadc3d9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db; // どこでもDBを使えるようにする
