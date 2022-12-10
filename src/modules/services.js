import axios from "axios";

export const getMovies = (page, year, search) => {
  return new Promise(async (resolve, reject) => {
    if (search!==null) {
      try {
        const response = await axios.post(
          `http://www.omdbapi.com/?apikey=c5b429de&type=movie&s=${search}&y=${year}&page=${page}`
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    } else {
      try {
        const response = await axios.post(
          `http://www.omdbapi.com/?apikey=c5b429de&type=movie&s=movie&y=${year}&page=${page}`
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
        `http://www.omdbapi.com/?apikey=c5b429de&plot=full&i=${id}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
export const getSuggestion = (type) => {
  console.log(type);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        `http://www.omdbapi.com/?apikey=c5b429de&type=movie&s=${type}`
      );
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
};
