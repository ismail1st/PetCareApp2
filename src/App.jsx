import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PetList from "./components/PetList";
import AddPetForm from "./components/AddPetForm";
import EditPetForm from "./components/EditPetForm";
import ReminderList from "./components/ReminderList";
import Login from "./components/Login";
import toast, { Toaster } from "react-hot-toast";

// ✅ Use environment variable for flexible backend connection
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

function App() {
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load saved user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
    setLoading(false);
  }, []);

  // ✅ Fetch pets
  useEffect(() => {
    if (user) {
      fetch(`${API_BASE}/pets`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch pets");
          return res.json();
        })
        .then(setPets)
        .catch((err) => console.error("Error fetching pets:", err));
    }
  }, [user]);

  // ✅ Fetch reminders
  useEffect(() => {
    if (user) {
      fetch(`${API_BASE}/reminders`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch reminders");
          return res.json();
        })
        .then(setReminders)
        .catch(() => console.log("No reminders found"));
    }
  }, [user]);

  // ✅ Add pet
  const handleAddPet = (newPet) => {
    fetch(`${API_BASE}/pets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPet),
    })
      .then((res) => res.json())
      .then((data) => {
        setPets((prev) => [...prev, data]);
        toast.success(`${data.name} added successfully!`);
      })
      .catch(() => toast.error("Failed to add pet"));
  };

  // ✅ Delete pet
  const handleDeletePet = (id) => {
    fetch(`${API_BASE}/pets/${id}`, { method: "DELETE" })
      .then(() => {
        setPets((prev) => prev.filter((p) => p.id !== id));
        toast.success("Pet deleted!");
      })
      .catch(() => toast.error("Failed to delete pet"));
  };

  // ✅ Update pet
  const handleUpdatePet = (updatedPet) => {
    fetch(`${API_BASE}/pets/${updatedPet.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPet),
    })
      .then((res) => res.json())
      .then((data) => {
        setPets((prev) => prev.map((p) => (p.id === data.id ? data : p)));
        toast.success(`${data.name} updated!`);
      })
      .catch(() => toast.error("Failed to update pet"));
  };

  // ✅ Add reminder
  const handleAddReminder = (reminder) => {
    fetch(`${API_BASE}/reminders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reminder),
    })
      .then((res) => res.json())
      .then((data) => {
        setReminders((prev) => [...prev, data]);
        toast.success("Reminder added!");
      })
      .catch(() => toast.error("Failed to add reminder"));
  };

  // ✅ Delete reminder
  const handleDeleteReminder = (id) => {
    fetch(`${API_BASE}/reminders/${id}`, { method: "DELETE" })
      .then(() => {
        setReminders((prev) => prev.filter((r) => r.id !== id));
        toast.success("Reminder deleted!");
      })
      .catch(() => toast.error("Failed to delete reminder"));
  };

  // ✅ Login
  const handleLogin = (userData) => {
    console.log("Logging in user:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success(`Welcome ${userData.username}!`);
  };

  // ✅ Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
  };

  if (loading) return null; // wait for user to load from localStorage

  return (
    <Router>
      <Toaster position="top-right" />
      {user ? (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/pets"
              element={<PetList pets={pets} onDelete={handleDeletePet} />}
            />
            <Route
              path="/add"
              element={<AddPetForm onAddPet={handleAddPet} />}
            />
            <Route
              path="/pets/:id/edit"
              element={<EditPetForm onUpdatePet={handleUpdatePet} />}
            />
            <Route
              path="/reminders"
              element={
                <ReminderList
                  reminders={reminders}
                  onAddReminder={handleAddReminder}
                  onDeleteReminder={handleDeleteReminder}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
