import React from "react";
import { useParams } from "react-router-dom"; //Hook that grabs parameters;

//Config:
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

//Components:
import Grid from "./Grid";
import Spinner from "./Spinner";
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";
//Hook:
import { useMovieFetch } from "../Hooks/useMovieFetch";

//Image:
import NoImage from "../images/no_image.jpg"; //Always add the extension when it's a svg,png etc;

const Movie = () => {
  const { movieId } = useParams(); //Getting the id from the route;//You have to use the same name as in the route where you're using it from;
  const { state: movie, loading, error } = useMovieFetch(movieId);
  //console.log(movie);
  if (loading) return <Spinner />;
  if (error) return <div>Oops... Something went wrong...</div>;
  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfoBar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header="Actors">
        {movie.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageUrl={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : NoImage
            }
          />
        ))}
      </Grid>
    </>
  );
};

export default Movie;

//Done with a class component instead of a functional component:

// import React, { Component } from "react";
// import { useParams } from "react-router-dom"; //Hook that grabs parameters;

// //Config:
// import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";

// //Components:
// import Grid from "./Grid";
// import Spinner from "./Spinner";
// import BreadCrumb from "./BreadCrumb";
// import MovieInfo from "./MovieInfo";
// import MovieInfoBar from "./MovieInfoBar";
// import Actor from "./Actor";
// import API from "../API";

// //Image:
// import NoImage from "../images/no_image.jpg"; //Always add the extension when it's a svg,png etc;
// class Movie extends Component {
//   state = {
//     movie: {},
//     loading: true,
//     error: false,
//   };

//   fetchData = async () => {
//     const { movieId } = this.props.params;
//     //Fetching logic:

//     try {
//       this.setState({ error: false, loading: true });

//       const movie = await API.fetchMovie(movieId); //Current movie;
//       const credits = await API.fetchCredits(movieId); //Credits from the current movie;

//       //Getting directors only:

//       const directors = credits.crew.filter(
//         (member) => member.job === "Director"
//       );
//       this.setState({
//         movie: {
//           //State now has the following properties:
//           ...movie, //Spreading the movie object into it's properties;
//           actors: credits.cast, //All the cast is inside the actors variable;
//           directors: directors,
//         },
//         loading: false,
//       });
//     } catch (error) {
//       this.setState({ error: true, loading: false });
//     }
//   };

//   componentDidMount() {
//     this.fetchData();
//   }
//   render() {
//     const { movie, loading, error } = this.state;
//     if (loading) return <Spinner />;
//     if (error) return <div>Something went wrong...</div>;
//     return (
//       <>
//         <BreadCrumb movieTitle={movie.original_title} />
//         <MovieInfo movie={movie} />
//         <MovieInfoBar
//           time={movie.runtime}
//           budget={movie.budget}
//           revenue={movie.revenue}
//         />
//         <Grid header="Actors">
//           {movie.actors.map((actor) => (
//             <Actor
//               key={actor.credit_id}
//               name={actor.name}
//               character={actor.character}
//               imageUrl={
//                 actor.profile_path
//                   ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
//                   : NoImage
//               }
//             />
//           ))}
//         </Grid>
//       </>
//     );
//   }
// }

// //Wrapper component that shows movies but with the react routing active:
// const MovieWithParams = (props) => <Movie {...props} params={useParams()} />;

// export default MovieWithParams;
