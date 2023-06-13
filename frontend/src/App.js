import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  BrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/Login";
import Quora from "./components/Quora";
import Signup from "./components/auth/Signup";
import SignIn from "./components/auth/Signin";
// import Dashboard from "./components/Dashboard";
import { login, logout, selectUser } from "./feature/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    const updateUserSession = () => {
      fetch('./api/updateSession', {
        method: 'POST',
        credentials: 'include', // include session cookie with request
      })
        .then(response => {
          if (response.ok) {
            console.log('Session updated successfully');
          } else if (response.status === 401) {
            console.log('Session timed out or user not authorized');
            dispatch(logout());
          } else {
            console.log('Error updating session');
          }
        })
        .catch(error => {
          console.error('Error updating session:', error);
        });
    };

    let interval;

    if (user) {
      interval = setInterval(updateUserSession,  2*60 * 1000); // update session every 5 minutes
    }

    return () => {
      clearInterval(interval);
    };
  }, [user, dispatch]);




  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
            // isAdmin: true,
          })
        );
        console.log("AuthUser", authUser);
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (user && user.isAdmin) {
  //     navigate("/dashboard");
  //   }
  // }, [user, navigate]);

  return (
    <div className="app">
      {!user ? (
        <>
          <Login/>
          <SignIn />
          <BrowserRouter>
            <Signup />
          </BrowserRouter>
          
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