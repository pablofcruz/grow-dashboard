
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, ProviderId, signInWithPopup} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA8xFrDhuj65YeEoWs8za8zyYxkYEoAclA",
  authDomain: "grow-dashboard-13613.firebaseapp.com",
  projectId: "grow-dashboard-13613",
  storageBucket: "grow-dashboard-13613.appspot.com",
  messagingSenderId: "416309614293",
  appId: "1:416309614293:web:77ab33ca11bd164cb8345c",
  measurementId: "G-10NY3MMNF5"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const Gprovider = new GoogleAuthProvider()
export const signInWithGoogle = () =>{
    signInWithPopup(auth, Gprovider).then((result)=>{
       const name = result.user.displayName
       const email = result.user.email
       localStorage.setItem("name", name)
       localStorage.setItem("email", email)
    }).catch((error)=>{
        console.log(error)
    })
}
