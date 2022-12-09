const getMovie = async () => {
    console.log("loading");
        return new Promise(async (resolve, reject) => {
            try {
              const response = await fetch(
                `http://www.omdbapi.com/?apikey=c5b429de&type=movie&y=2022&plot=full&s=movie`
              );
              const data = await response.json();
              console.log(data);
              console.log("loading bitti");
              resolve(data);
            } catch (error) {
              reject(error);
            }
          });
    }

export default getMovie