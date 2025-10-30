import { useState } from "react";

function ReminderList({ reminders, onAddReminder, onDeleteReminder }) {
  const [newReminder, setNewReminder] = useState({ date: "", note: "" });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newReminder.date || !newReminder.note.trim()) return;
    onAddReminder({ ...newReminder, id: Date.now() });
    setNewReminder({ date: "", note: "" });
  };

  return (
    <div className="reminder-list">
      <h2>Reminders</h2>

      {/* ➕ Add Reminder Form */}
      <form onSubmit={handleAdd} className="reminder-form">
        <input
          type="date"
          value={newReminder.date}
          onChange={(e) =>
            setNewReminder({ ...newReminder, date: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Reminder note (e.g., Vet visit at 3 PM)"
          value={newReminder.note}
          onChange={(e) =>
            setNewReminder({ ...newReminder, note: e.target.value })
          }
        />
        <button type="submit">Add</button>
      </form>

      {/* 📅 Reminder List */}
      <ul>
        {reminders.length > 0 ? (
          reminders.map((rem) => (
            <li key={rem.id} className="reminder-item">
              <div>
                <strong>{rem.date}</strong> — {rem.note}
              </div>
              <button onClick={() => onDeleteReminder(rem.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p className="no-reminders">No reminders yet.</p>
        )}
      </ul>
    </div>
  );
}

export default ReminderList;
