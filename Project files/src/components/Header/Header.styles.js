import styled from "styled-components";

//Exporting all styled components that I make here;
export const Wrapper = styled.div`
  background: var(--darkGrey);
  padding: 0 20px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--maxWidth);
  padding: 20px 0;
  margin: 0 auto;
  color: var(--white);

  a {
    text-decoration: none;
    color: var(--white);
  }
  #logged-in {
    position: relative;
    left: 30%;
  }
  #login {
    position: relative;
    left: 1150%;
  }
  @media only screen and (max-width: 700px) {
    #logged-in {
      left: 0;
      left:4%;
    }
    #login {
      left: 0;
      left: 90%;
    }
  }
`;

export const LogoImg = styled.img`
  width: 200px;
  /*You can nest media queries*/
  @media only screen and (max-width: 500px) {
    width: 150px;
  }
`;

export const TMDBLogoImg = styled.img`
  width: 100px;
  @media only screen and (max-width: 500px) {
    width: 80px;
  }
`;
