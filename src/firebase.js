import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdqmg_VDUuY6_50PDKWVdK741V0VtSaU4",
  authDomain: "ambient-future-241906.firebaseapp.com",
  databaseURL: "https://ambient-future-241906.firebaseio.com",
  projectId: "ambient-future-241906",
  storageBucket: "ambient-future-241906.appspot.com",
  messagingSenderId: "75274502713",
  appId: "1:75274502713:web:e724b149799a35b37e03e8",
  measurementId: "G-S6LJR12EJY"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };
