// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtO_DRvYgUpghE5acL2eQ6JEt32SxnHwU',
  authDomain: 'ecom-d21a0.firebaseapp.com',
  projectId: 'ecom-d21a0',
  storageBucket: 'ecom-d21a0.appspot.com',
  messagingSenderId: '71257764043',
  appId: '1:71257764043:web:295182fbee6788f659eb4e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
