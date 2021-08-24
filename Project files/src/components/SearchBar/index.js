import React, { useState, useEffect, useRef } from "react";

//Styles:
import { Wrapper, Content } from "./SearchBar.styles";
//Image:
import searchIcon from "../../images/search-icon.svg";

const SearchBar = ({ setSearchTerm }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);

  useEffect(() => {
    //Skipping the initial render in the useEffect:
    if (initial.current) {
      initial.current = false; //Can be mutated directly bc it doesn't trigger a re-render (different than state);
      return;
    }
    const timer = setTimeout(() => {
      setSearchTerm(state); //After 500 milliseconds the setter of the search term is called with the state (input field value);
    }, 500);
    return () => clearTimeout(timer); //This will always clear the last timer and reset it;
  }, [setSearchTerm, state]); //This is like a lambda function in C++;
  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={(event) => setState(event.currentTarget.value)} //Getting the current value in the input field;
          value={state} //Input field becomes the new set state;
        />
      </Content>
    </Wrapper>
  );
};

export default SearchBar;
