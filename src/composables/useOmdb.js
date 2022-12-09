export default () => {
  const getMovie = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=c5b429de&type=movie&y=2022&plot=full&s=movie`
        );
        const data = await response.json();
        console.log(data);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };


  return { getMovie };
};
