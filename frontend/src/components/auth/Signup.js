import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
function Signup() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [userType, setUserType] = useState("");
const [adminCode, setAdminCode] = useState("");
const [error, setError] = useState("");
const [showBackButton, setShowBackButton] = useState(false);
const navigate = useNavigate();

const handleSignup = (event) => {
event.preventDefault();


if (userType === "admin" && adminCode !== "1234") {
  setError("Invalid admin code");
  return;
}

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // User is signed up successfully
    const user = userCredential.user;

    console.log("User created successfully");
    navigate("./Dashboard.js");
  })
  .catch((error) => {
    // Handle errors here
    setError(error.message);
    console.log(error);
  });
};

const handleUserTypeSelection = (selectedUserType) => {
setUserType(selectedUserType);
setShowBackButton(true);
};

const handleBackButtonClick = () => {
setUserType("");
setShowBackButton(false);
};
// useEffect(() => {
// const unsubscribe = auth.onAuthStateChanged((user) => {
// if (user) {
// if (userType === "admin") {
// history.push("/dashboard");
// }
// }
// });
// return () => unsubscribe();
// }, [history, userType]);

return (
<div className="signup-container">
{userType === "" && (
<div>
<form onSubmit={handleSignup} className="signin-form">
<h2>Select user type:</h2>
<button onClick={() => handleUserTypeSelection("user")}>User</button>
<button onClick={() => handleUserTypeSelection("admin")}>Admin</button>
</form>
</div>
)}
{userType !== "" && (
<form onSubmit={handleSignup} className="signup-form">
<h2>{userType === "user" ? "User Signup" : "Admin Signup"}</h2>
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
{userType === "admin" && (
<div className="form-group">
<label>Admin Code</label>
<input
type="text"
name="admin-code"
value={adminCode}
onChange={(e) => setAdminCode(e.target.value)}
/>
</div>
)}
<div className="form-group button-container">
{showBackButton && (
<button type="button" onClick={handleBackButtonClick}>
Back
</button>
)}
<button type="submit">Sign up</button>
</div>
</form>
)}
</div>
);
}

export default Signup;