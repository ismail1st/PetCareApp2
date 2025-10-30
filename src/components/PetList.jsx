import { useState } from "react";
import PetCard from "./PetCard";

function PetList({ pets, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Filter pets by name or breed
  const filteredPets = pets.filter((pet) =>
    `${pet.name} ${pet.breed}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pet-list">
      <h2>All Pets</h2>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search by name or breed..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="card-grid">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} onDelete={onDelete} />
          ))
        ) : (
          <p className="no-results">No pets found.</p>
        )}
      </div>
    </div>
  );
}

export default PetList;
