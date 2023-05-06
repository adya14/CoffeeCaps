import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Signin.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User is signed in successfully
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // Handle errors here
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSignIn} className="signin-form">
        <h2>Log in</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group button-container">
          <button type="submit">Log in</button>
        </div>
      </form>
    </div>
  );
}

export default SignIn; 