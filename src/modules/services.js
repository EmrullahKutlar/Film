import axios from "axios";

export const getMovies = (page, year, search,type) => {
  return new Promise(async (resolve, reject) => {
    if (search!==null) {
      type==="series"?type="series":type="movie";
      try {
        const response = await axios.post(
          `http://www.omdbapi.com/?apikey=75c9847a&type=${type}&s=${search}&page=${page}`
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    } else {
      try {
        const response = await axios.post(
          `http://www.omdbapi.com/?apikey=75c9847a&type=movie&s=movie&y=${year}&page=${page}`
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    }
  });
};
export const getMovieById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://www.omdbapi.com/?apikey=75c9847a&plot=full&i=${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
export const getSuggestion = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://www.omdbapi.com/?apikey=75c9847a&type=movie&s=${type}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
export const searchMovie = (search,type) => {
  type==="series"?type="series":type="movie";
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://www.omdbapi.com/?apikey=75c9847a&type=${type}&s=${search}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
