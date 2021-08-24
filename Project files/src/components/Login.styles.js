import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  font-size: var(--fontBig);
  color: var(--darkGrey);
  height: 100%;

  input {
    width: 50%;
    height: 40px;
    margin-top: 10px;
    font-size: var(--fontMed);
    border: 1px solid var(--darkGrey);
    border-radius: 20px;
    padding: 10px;

    :focus {
      outline: none;
    }
  }
  .error {
    color: red;
    font-size: var(--fontBig);
  }
`;
