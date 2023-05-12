import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./components/auth/Login";
import Quora from "./components/Quora";
import Signup from "./components/auth/Signup";
import SignIn from "./components/auth/Signin";
import { login, logout, selectUser } from "./feature/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
        console.log("AuthUser", authUser);
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <>
          <Login />
          <SignIn/>
          <Signup />
        </>
      ) : (
        <>
          <Quora />
        </>
      )}
    </div>
  );
}

export default App;