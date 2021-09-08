import { useState, useEffect } from "react";
import API from "../API";
import { isPersistedState } from "../helpers";
export const useMovieFetch = (movieId) => {
  const [state, setState] = useState({}); //Default  empty object;
  const [loading, setLoading] = useState(true); //True bc it start's by fetching the data for the movie;
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      //Fetching logic:
      try {
        setLoading(true); //Loading...
        setError(false); //Can't be a current error now;

        const movie = await API.fetchMovie(movieId); //Current movie;
        const credits = await API.fetchCredits(movieId); //Credits from the current movie;

        //Getting directors only:

        const directors = credits.crew.filter(
          (member) => member.job === "Director"
        );
        setState({
          //State now has the following properties:
          ...movie, //Spreading the movie object into it's properties;
          actors: credits.cast, //All the cast is inside the actors variable;
          directors: directors
        });
        setLoading(false); //Loading is finished;
      } catch (error) {
        setError(true);
      }
    };

    const sessionState = isPersistedState(movieId); //Each movie is saved with it's own id;
    if (sessionState) {
      console.log("sessionStorage movieId");
      setState(sessionState);
      setLoading(false); //No spinner;
      return;
    }
    console.log("API movieId");
    fetchData();
  }, [movieId, setLoading]);

  //Writing to session storage: 

  useEffect(() => {
    sessionStorage.setItem("movieId", JSON.stringify(state));
  }, [movieId, state]);
  return { state, loading, error };
};
