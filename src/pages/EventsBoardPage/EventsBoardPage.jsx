// import { getAllEvents } from '../../../db-api.js';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import css from './EventsBoardPage.module.css';
export default function EventsBoardPage() {
  // 1. Оголошуємо стан
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function fetchEvents() {
      const response = await axios.get(
        'https://event-registration-app-backend-1.onrender.com/events'
      );
      // 2. Записуємо дані в стан
      //   console.log(response.data.data);

      setEvents(response.data.data);
    }

    fetchEvents();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Events</h1>
      {events.length > 0 && (
        <ul className={css.list}>
          {events.map(({ _id, title, description, event_date, organizer }) => (
            <li key={_id} className={css.list_item}>
              <h3>{title}</h3>
              <span>{description}</span>
              <span>{event_date}</span>
              <span>{organizer}</span>
              <div className={css.container_link}>
                <NavLink to={`/register/${_id}`}>Register</NavLink>
                <NavLink to={`/view/${_id}`}>View</NavLink>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
