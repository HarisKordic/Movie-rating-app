import React from "react";
import PropTypes from "prop-types";

//Styles:

import { Wrapper, Content } from "./Grid.styles";

const Grid = ({ header, children }) => (
  <Wrapper>
    <h1> {header}</h1>
    <Content>{children}</Content>
  </Wrapper>
);
Grid.propTypes = {
  header: PropTypes.string,
  //Children don't need validation bc they are a built in property;
};
export default Grid;
