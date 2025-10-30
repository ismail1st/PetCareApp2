import { useState } from "react";
import logo from "/logoanimal.png"; // ✅ works from /public or root

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return alert("Please enter your username");

    // Send username and image to App
    onLogin({ username, image });
  };

  return (
    <div className="login-container">
      {/* ✅ This image now loads correctly */}
      <img src={logo} alt="Pet Tracker Logo" className="login-logo" />

      <h2>🐾 Welcome to Pet Care Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="Profile image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Enter your username, password, and optionally a profile picture to get
        started!
      </p>
    </div>
  );
}

export default Login;
