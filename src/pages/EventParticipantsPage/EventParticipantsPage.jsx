import { useParams } from 'react-router-dom';
import css from './EventParticipantsPage.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EventParticipantsPage() {
  const { eventId } = useParams(); // Получаем eventId из параметров маршрута
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState(null); // Добавляем состояние для обработки ошибок

  useEffect(() => {
    async function fetchParticipants() {
      try {
        // Отправляем запрос на сервер для получения участников по eventId
        const response = await axios.get(
          `https://event-registration-app-backend-1.onrender.com/users/${eventId}`
        );
        console.log(response.data.data);
        
        // Проверяем, есть ли данные и записываем их в состояние
        setParticipants(response.data.data);
      } catch (err) {
        // Логируем ошибку и сохраняем её в состояние
        console.error('Ошибка при получении участников:', err);
        setError(err.message || 'Ошибка сервера');
      }
    }

    fetchParticipants();
  }, [eventId]); 
// console.log({participants});

  return (
    <>
      <h1 className={css.title}>Awesome Event Participants</h1>
      {error && <p className={css.error}>Ошибка: {error}</p>} {/* Выводим сообщение об ошибке */}
      
      {participants.length > 0 ? (
        <ul className={css.list}>
          {participants.map(({ _id, fullName, email }) => (
            <li key={_id} className={css.list_item}>
              <h3>{fullName}</h3>
              <span>{email}</span>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p className={css.no_participants}>Нет участников</p>
      )}
    </>
  );
}
