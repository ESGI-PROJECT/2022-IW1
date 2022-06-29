import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  onChildAdded,
  onChildRemoved,
  push,
  serverTimestamp,
} from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import firebaseConfig from "./firebase.json";
import page from "page";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export function writeComment({ productId, comment }) {
  push(ref(database, `/comments/product-${productId}`), {
    comment,
    user: 1,
    date: serverTimestamp(),
  });
}

export function readComments(productId, cb = () => {}) {
  const path = ref(database, `/comments/product-${productId}`);

  let data = [];
  onChildAdded(path, (snapshot) => {
    data.push({
      key: snapshot.key,
      ...snapshot.val(),
    });

    cb(data);
  });

  onChildRemoved(path, (snapshot) => {
    data = data.filter((item) => item.key == snapshot.key);
    cb(data);
  });
}

export function authChanged(cb = () => {}) {
  onAuthStateChanged(auth, (user) => {
    if (user) cb(user);
  });
}

export function getUser() {
  return auth.currentUser;
}

export function createUser(email, password) {
  return setPersistence(auth, browserLocalPersistence).then(() => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (user) => user
    );
  });
}
