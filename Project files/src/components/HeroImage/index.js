import React from "react";
import PropTypes from "prop-types";

//Importing styles:
import { Wrapper, Content, Text } from "./HeroImage.styles";

//Creating the component:
//ES6 syntax with destructuring the object: ({image,title,text});
const HeroImage = ({ image, title, text }) => (
  <Wrapper image={image}>
    <Content>
      <Text>
        {/* Grabbing server properties and putting them in tags */}
        <h1>{title}</h1>
        <p>{text}</p>
      </Text>
    </Content>
  </Wrapper>
);
HeroImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};
export default HeroImage;
