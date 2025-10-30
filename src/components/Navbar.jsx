import { NavLink } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <h2>🐾 Pet Care Tracker</h2>
      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>{" "}
        | <NavLink to="/pets">All Pets</NavLink> |{" "}
        <NavLink to="/add">Add Your Pet</NavLink> |{" "}
        <NavLink to="/reminders">Reminders</NavLink>
      </div>

      {user && (
        <div className="user-info">
          <img
            src={user.image || "https://i.pravatar.cc/40"}
            alt="profile"
            className="profile-pic"
          />
          <span>{user.name}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
