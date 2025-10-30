import { useState } from "react";

function AddPetForm({ onAddPet }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    breed: "",
    health: "",
    grooming: "Regular grooming and brushing.",
    exercise: "Daily walks or playtime.",
    vaccination: "Keep up-to-date with vaccines.",
    image: "https://place-puppy.com/200x200", // default placeholder
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle image upload or manual URL
  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageURL });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPet(formData);
    setFormData({
      name: "",
      age: "",
      breed: "",
      health: "",
      grooming: "Regular grooming and brushing.",
      exercise: "Daily walks or playtime.",
      vaccination: "Keep up-to-date with vaccines.",
      image: "https://place-puppy.com/200x200",
    });
  }

  return (
    <form onSubmit={handleSubmit} className="add-pet-form">
      <h2>Add a New Pet</h2>

      <input
        type="text"
        name="name"
        placeholder="Pet Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="breed"
        placeholder="Breed"
        value={formData.breed}
        onChange={handleChange}
      />

      <input
        type="text"
        name="health"
        placeholder="Health Info"
        value={formData.health}
        onChange={handleChange}
      />

      {/* ✅ Image Upload */}
      <label>Upload Pet Image:</label>
      <input type="file" accept="image/*" onChange={handleImageChange} />

      {/* ✅ OR Image URL Input */}
      <input
        type="url"
        name="image"
        placeholder="Or paste an image URL"
        value={formData.image}
        onChange={handleChange}
      />

      {/* ✅ Image Preview */}
      <div className="image-preview" style={{ marginTop: "10px" }}>
        <img
          src={formData.image}
          alt="Pet Preview"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </div>

      <button type="submit">Add Pet</button>
    </form>
  );
}

export default AddPetForm;
