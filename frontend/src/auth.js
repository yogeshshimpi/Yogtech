import { FacebookAuthProvider , GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut} from "firebase/auth";

import {auth} from "./firebase"



export const loginWithGitHub = () => {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider);
};  
export const loginWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth,provider)
        .then((result)=>{
            const user = result.user;
            console.log("Name: ", user.displayName)
            console.log("Email: ", user.email)
            console.log("uid: ", user.uid)
            console.log("profile photo: ", user.photoURL)
        })
        .catch((error)=>{
            console.error("Login error: ", error)
        })
}
export const logout = () => signOut(auth);