import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User is signed up successfully
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
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h2>Sign up</h2>
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
          <button type="submit">Sign up</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;