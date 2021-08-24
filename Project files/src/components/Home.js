import React from "react"; //Importing useState from React lib;
//Config:
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
//Components:
import HeroImage from "./HeroImage";
import Grid from "./Grid";
import Thumb from "./Thumb";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";
import Button from "./Button";
//Hook:
import { useHomeFetch } from "../Hooks/useHomeFetch";

//Image:
import NoImage from "../images/no_image.jpg";

const Home = () => {
  const { state, loading, error, searchTerm, setSearchTerm ,setIsLoadingMore} = useHomeFetch();
  console.log(state);

  if(error)return <div>Something went wrong...</div>

  return (
    <>
      {/*This is a fragment item used to wrap everything else;*/}

      {!searchTerm && state.results[0] ? ( //If theres no search term and there is the first movie in the array;
        <HeroImage
          // Sending properties needed by the HeroImage component
          image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].original_title}
          text={state.results[0].overview}
        />
      ) : null}
      <SearchBar setSearchTerm={setSearchTerm} />
      {/*Passing along the needed searchTerm*/}
      <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
        {/*If there is a search term the grid will say search result if there is no search term the grid will say popular movies */}
        {state.results.map(
          (
            movie //With map we iterate trough the array of results and extract each movie in the object 'movie'
          ) => (
            //<div key={movie.id}>{movie.title}</div>//We use keys because each child should have a unique key prop;
            <Thumb
              key={movie.id}
              clickable
              image={
                //We search if there is a valid image if there isn't one we set the default NoImage;
                movie.poster_path
                  ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                  : NoImage
              }
              movieId={movie.id}
            />
          )
        )}
      </Grid>
      { loading && <Spinner />}{/*It will show the spinner only if the loading is active,otherwise it will go to the button */}
      {state.page < state.total_pages && !loading && (//If there's more  pages to load  and we're not loading anything rn then render the button;
        <Button text="Load more" callBack={()=>setIsLoadingMore(true)} />//Because more content is loading;
      )}
    </>
  );
};

export default Home;

//Done in class component instead of functional component:

// import React,{ Component } from "react"; //Importing useState from React lib;
// //Config:
// import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from "../config";
// //Components:
// import HeroImage from "./HeroImage";
// import Grid from "./Grid";
// import Thumb from "./Thumb";
// import Spinner from "./Spinner";
// import SearchBar from "./SearchBar";
// import Button from "./Button";
// import API from "../API";
// //Hook:
// import { useHomeFetch } from "../Hooks/useHomeFetch";

// //Image:
// import NoImage from "../images/no_image.jpg";
// const initialState = {
//   page: 0,
//   results: [],
//   total_pages: 0,
//   total_results: 0,
// };
// class Home extends Component {
//   state = {
//     movies: initialState,
//     searchTerm: "",
//     setIsLoadingMore: false,
//     loading: false,
//     error: false,
//   };

//   fetchMovies = async (page, searchTerm = "") => {
//     //Fetch function;
//     try {
//       this.setState({ error: false, loading: true });
//       const movies = await API.fetchMovies(searchTerm, page);

//       this.setState((prev) => ({
//         //Spreading out and object:
//         ...prev,
//         movies: {
//           ...movies,
//           results:
//             page > 1
//               ? [...prev.movies.results, ...movies.results]
//               : [...movies.results], //Spreading old movies and appending new ones;
//         },
//         loading: false,
//       }));
//     } catch (error) {
//       this.setState({ error: true, loading: false });
//     }
//   };

//   handleSearch = (searchTerm) => {
//     this.setState({ movies: initialState, searchTerm }, () =>
//       this.fetchMovies(1, this.state.searchTerm)
//     );
//   };
//   handleLoadMore = () => {
//     this.fetchMovies(this.state.movie.page + 1, this.state.searchTerm);
//   };
//   //To be able to fetch from the server:
//   componentDidMount() {
//     this.fetchMovies(1);
//   }
//   //Render is like the useEffect() in an functional component;
//   render() {
//     const { searchTerm, movies, loading, error } = this.state;

//     if (error) return <div>Something went wrong...</div>;

//     return (
//       <>
//         {/*This is a fragment item used to wrap everything else;*/}

//         {!searchTerm && movies.results[0] ? ( //If theres no search term and there is the first movie in the array;
//           <HeroImage
//             // Sending properties needed by the HeroImage component
//             image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
//             title={movies.results[0].original_title}
//             text={movies.results[0].overview}
//           />
//         ) : null}
//         <SearchBar setSearchTerm={this.handleSearch} />
//         {/*Passing along the needed searchTerm*/}
//         <Grid header={searchTerm ? "Search Result" : "Popular Movies"}>
//           {/*If there is a search term the grid will say search result if there is no search term the grid will say popular movies */}
//           {movies.results.map(
//             (
//               movie //With map we iterate trough the array of results and extract each movie in the object 'movie'
//             ) => (
//               //<div key={movie.id}>{movie.title}</div>//We use keys because each child should have a unique key prop;
//               <Thumb
//                 key={movie.id}
//                 clickable
//                 image={
//                   //We search if there is a valid image if there isn't one we set the default NoImage;
//                   movie.poster_path
//                     ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
//                     : NoImage
//                 }
//                 movieId={movie.id}
//               />
//             )
//           )}
//         </Grid>
//         {loading && <Spinner />}
//         {/*It will show the spinner only if the loading is active,otherwise it will go to the button */}
//         {movies.page < movies.total_pages &&
//           !loading && ( //If there's more  pages to load  and we're not loading anything rn then render the button;
//             <Button text="Load more" callBack={() => this.handleLoadMore} /> //Because more content is loading;
//           )}
//       </>
//     );
//   }
// }

// export default Home;
