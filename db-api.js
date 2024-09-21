import axios from 'axios';

axios.defaults.baseURL =
  'https://event-registration-app-backend-1.onrender.com';
// const API_KEY = 'b5278d9cb671417837e9caec82d9791a';

export const getAllEvents = async () => {
  const response = await axios.get(`/events`);
// console.log(response.data);

  return response.data;
};

export const fetchEventById = async (movieId) => {
  const response = await axios.post(
    `users/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );

  return response.data;
};

// export const fetchMovieCast = async (movieId) => {
//   const response = await axios.get(
//     `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
//   );

//   return response.data;
// };
// export const fetchMovieReviews = async (movieId) => {
//   const response = await axios.get(
//     `movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
//   );

//   return response.data;
// };
