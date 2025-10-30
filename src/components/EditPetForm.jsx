import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE = "http://localhost:3001";

function EditPetForm({ onUpdatePet }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch pet data by ID
  useEffect(() => {
    fetch(`${API_BASE}/pets/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load pet");
        return res.json();
      })
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load pet data");
        setLoading(false);
      });
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_BASE}/pets/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update pet");
        return res.json();
      })
      .then((updatedPet) => {
        onUpdatePet(updatedPet);
        toast.success(`${updatedPet.name} updated successfully!`);
        navigate("/pets");
      })
      .catch(() => toast.error("Failed to update pet."));
  };

  if (loading) return <p>Loading pet data...</p>;
  if (!formData) return <p>Pet not found.</p>;

  return (
    <form className="add-pet-form" onSubmit={handleSubmit}>
      <h2>Edit Pet Details</h2>

      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Breed:</label>
      <input
        type="text"
        name="breed"
        value={formData.breed}
        onChange={handleChange}
        required
      />

      <label>Age:</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
      />

      <label>Health:</label>
      <textarea name="health" value={formData.health} onChange={handleChange} />

      <label>Grooming:</label>
      <textarea
        name="grooming"
        value={formData.grooming}
        onChange={handleChange}
      />

      <label>Exercise:</label>
      <textarea
        name="exercise"
        value={formData.exercise}
        onChange={handleChange}
      />

      <label>Vaccination:</label>
      <textarea
        name="vaccination"
        value={formData.vaccination}
        onChange={handleChange}
      />

      <label>Image URL:</label>
      <input
        type="url"
        name="image"
        value={formData.image}
        onChange={handleChange}
      />

      <button type="submit">Update Pet</button>
    </form>
  );
}

export default EditPetForm;
