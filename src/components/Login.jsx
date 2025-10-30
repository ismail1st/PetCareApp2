import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState(""); // ✅ changed from name
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) return alert("Please enter your username"); // updated message
    if (!password) return alert("Please enter a password");
    onLogin({ username, image, password }); // send username instead of name
  };

  return (
    <div className="login-container">
      <img src="logoanimal.png" alt="Pet Tracker Logo" className="login-logo" />
      <h2>🐾 Welcome to Pet Care Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username" // updated placeholder
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
