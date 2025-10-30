import { useEffect, useState } from "react";

function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();

        // ✅ Filter out past events & sort by soonest date
        const upcoming = data
          .filter((event) => new Date(event.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3); // Only show next 3

        setUpcomingEvents(upcoming);
      })
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="home">
      <h1>Welcome to Pet Care Tracker</h1>
      <p>Track your pets' grooming, exercise, and health easily.</p>

      <section className="upcoming-reminders">
        <h2>📅 Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <ul>
            {upcomingEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.date}</strong> — {event.note}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events.</p>
        )}
      </section>
    </div>
  );
}

export default Home;
