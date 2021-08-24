import React, { useContext } from "react"; //Importing the react object;
import { Link } from "react-router-dom";
import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";
import { Wrapper, Content, LogoImg, TMDBLogoImg } from "./Header.styles";
import { Context } from "../../context";

//Creating component:
const Header = () => {
  const [user] = useContext(Context); //Setter not needed;
  console.log(user);
  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <LogoImg src={RMDBLogo} alt="rmdb-logo" />
        </Link>
        {/*If the user is logged in show span if not relink to login page */}
        {user ? (
          <span id="logged-in">Logged in as : {user.username}</span>
        ) : (
          <Link to="/login">
            <span id="login" >Log in</span>
          </Link>
        )}
        <TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
      </Content>
    </Wrapper>
  );
};

export default Header; //You must export it;
