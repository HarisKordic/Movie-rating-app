import React, { useContext } from "react";
import Thumb from "../Thumb";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import PropTypes from "prop-types";
import Rate from "../Rate";
import API from "../../API";

//Context:
import { Context } from "../../context";

//Styles:
import { Wrapper, Content, Text } from "./MovieInfo.styles";
//Image:
import NoImage from "../../images/no_image.jpg";

const MovieInfo = ({ movie }) => {
  const [user] = useContext(Context); //Gives us the currently logged in user;
  //Creating callback func to send to the Rate component:
  const handleRating = async (value) => {
    //Value is value from range slider!

    const rate = await API.rateMovie(user.sessionId, movie.id, value);
    console.log(rate);
  };

  return (
    <Wrapper backdrop={movie.backdrop_path}>
      <Content>
        <Thumb
          //Checking if theres a image, can be done with +;
          image={
            movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
              : NoImage
          }
          clickable={false} //Can't be clicked;
          alt="movie=thumb"
        />
        <Text>
          <h1>{movie.title}</h1>
          <h3>Plot</h3>
          <p>{movie.overview}</p>

          <div className="rating-directors">
            <div>
              <h3>Rating</h3>
              <div className="score">{movie.vote_average}</div>
            </div>
            <div className="director">
              <h3>Director{movie.directors.length > 1 ? "s" : " "}</h3>
              {movie.directors.map((director) => {
                return <p key={director.credit_id}>{director.name}</p>;
                // console.log(director.name);
              })}
            </div>
          </div>
          {/*Showing the slider only if the user is logged in: */}
          {user && (
            <div>
              <p>Rate Movie</p>
              <Rate callback={handleRating} />
            </div>
          )}
        </Text>
      </Content>
    </Wrapper>
  );
};
MovieInfo.propTypes = {
  movie: PropTypes.object,
};
export default MovieInfo;
