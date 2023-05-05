import React from "react";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

function Login() {
  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <img
          src="https://i.pinimg.com/originals/94/36/20/943620f51b519405560a865cf3f97bfa.gif"
          alt="logo"
        />
        <img 
          src = "logo.png"
          alt = "name"
        />
        <button onClick={handleSubmit} className="btn-login">
          Login with Google
        </button>
        
      </div>
    </div>    
  );
}

export default Login;