import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '../Loader/Loader';
// import {getAllEvents} from '../../../db-api.js';
const EventsBoardPage = lazy(() =>
  import('../../pages/EventsBoardPage/EventsBoardPage')
);
const EventRegistrationPage = lazy(() => import('../../pages/EventRegistrationPage/EventRegistrationPage'));
const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);
// const EventParticipantsPage = lazy(() =>
//   import('../../pages/EventParticipantsPage/EventParticipantsPage')
// );
import css from './App.module.css';


export default function App() {

  
  // const allEvents = getAllEvents();
  // console.log({allEvents});
  
  return (
    <div className={css.container}>
      <Suspense fallback={<Loader />}>
      
        <Routes>
          {/* <Route path="/" element={<EventsBoardPage />} /> */}
           <Route path="/events" element={<EventsBoardPage />} />
           {/* <Route path="events/:eventId" element={<EventParticipantsPage />}> */}
            <Route path="/register/:eventId" element={<EventRegistrationPage />} />
            {/* <Route path="view" element={<EventParticipantsPage />} /> */}
          {/* </Route>  */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
