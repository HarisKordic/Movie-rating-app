//Importing needed libs:
import { useState, useEffect } from "react";
import API from "../API";
import { isPersistedState } from "../helpers";
const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};
export const useHomeFetch = () => {
  //useState is used to create functional components and states;
  const [state, setState] = useState(initialState); //Constructor for the hook which returns an array;//It is constructed with the initialState object;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  //console.log(searchTerm);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    //Fetch function;
    try {
      setError(false); //No current error;
      setLoading(true); //Fetching;
      const movies = await API.fetchMovies(searchTerm, page);

      setState((prev) => ({
        //Spreading out and object:
        ...movies,
        results:
          page > 1 ? [...prev.results, ...movies.results] : [...movies.results], //Spreading old movies and appending new ones;
      }));
    } catch (error) {
      setError(true); //Setting a state for the state of the error;
    }
    setLoading(false); //Because we're done loading the movies;
  };
  //Initial and search render:
  useEffect(() => {
    if (!searchTerm) {
      //If not searching for some movie currently:
      const sessionState = isPersistedState('homeState'); //Hard-coding  the string;Not the best way!;
      if (sessionState) {
        //If there is a sessionState do the following:
        console.log("Grabbing from sessionStorage");
        setState(sessionState);
        return; //We end it here;
      }
    }
    console.log("Grabbing from API");
    //inline function to trigger the useEffect;
    setState(initialState); //Wiping out the old movies;
    fetchMovies(1, searchTerm); //Fetching the 1st page;
  }, [searchTerm]); //Dependency array;Triggers each time the term changes;

  //Loading more:
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(state.page + 1, searchTerm); //Page \+1 bc we want to load more;
    setIsLoadingMore(false); //No more loading;
  }, [isLoadingMore, searchTerm, state]);

  //Write to sessionStorage:
  useEffect(() => {
    if (!searchTerm)
      //If we're in a search we don't want to save yet, because there's no final results;
      sessionStorage.setItem('homeState', JSON.stringify(state)); //First par. name (key) of the session second one is the value;
      //key name has to be the same as the parsed one in the function isPersistedState();
  }, [searchTerm, state]);
  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore }; //ES6 syntax;
};
