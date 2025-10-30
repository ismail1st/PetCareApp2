import { Link } from "react-router-dom";

function PetCard({ pet, onDelete }) {
  const {
    id,
    name,
    age,
    breed,
    health,
    grooming,
    exercise,
    vaccination,
    image,
  } = pet;

  return (
    <div className="pet-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>

      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Breed:</strong> {breed}
      </p>
      <p>
        <strong>Health:</strong> {health}
      </p>
      <p>
        <strong>Grooming:</strong> {grooming}
      </p>
      <p>
        <strong>Exercise:</strong> {exercise}
      </p>
      <p>
        <strong>Vaccination:</strong> {vaccination}
      </p>

      <div className="pet-actions">
        {/* ✅ Link matches App.jsx route */}
        <Link to={`/pets/${id}/edit`}>
          <button className="btn-edit">✏️ Edit</button>
        </Link>

        <button onClick={() => onDelete(id)} className="btn-delete">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default PetCard;
