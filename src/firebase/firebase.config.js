
const config = {
  apiKey: "AIzaSyCBoCpdJxoT5wYxsKlwkNp7LT_XutXija4",
  authDomain: "twitter-8934c.firebaseapp.com",
  projectId: "twitter-8934c",
  storageBucket: "twitter-8934c.appspot.com",
  messagingSenderId: "801806255350",
  appId: "1:801806255350:web:e2dbc9a33abddb07f5d8d7"
};

export function getFirebaseConfig() {
    if (!config || !config.apiKey) {
      throw new Error(
        'No Firebase configuration object provided.' +
          '\n' +
          "Add your web app's configuration object to firebase-config.js",
      );
    } else {
      return config;
    }
  }