import { initializeApp } from "@firebase/app";

import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyCRZli16K4DTDzsQKO-3VV23wvmJBtUbs4",
  authDomain: "parq---parking-system.firebaseapp.com",
  databaseURL: "https://parq---parking-system-default-rtdb.firebaseio.com",
  projectId: "parq---parking-system",
  storageBucket: "parq---parking-system.appspot.com",
  messagingSenderId: "947560656781",
  appId: "1:947560656781:web:1c4e13df3e5a8d6ac557c4",
  measurementId: "G-F85PQK2WCH",
};

const config = initializeApp(firebaseConfig);

export const db = ref(getDatabase(config));

export default config;
