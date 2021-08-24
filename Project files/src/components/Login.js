import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
//Components:
import Button from "./Button";

//Styles:
import { Wrapper } from "./Login.styles";
//Context:
import { Context } from "../context";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  //Getting the context value from our hook:
  const [user, setUser] = useContext(Context);

  //So we can navigate through the site:
  const navigate = useNavigate();

  const handleInput = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;

    if (name === "username") {
      //If the name is username set the value to the current parsed value;
      setUserName(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };
  const handleSubmit = async () => {
    setError(false);

    try {
      const requestToken = await API.getRequestToken();
      const sessionId = await API.authenticate(
        requestToken,
        username,
        password
      );
      setUser({ sessionId: sessionId.session_id, username: username });

      console.log(sessionId);

      //When login finished navigate to somewhere:

      navigate("/");
    } catch (error) {
      setError(true);
    }
  };
  return (
    <Wrapper>
      {error && <div className="error">There was an error logging in !</div>}
      <label>Username:</label>
      <input
        type="text"
        value={username}
        name="username"
        onChange={handleInput}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleInput}
      />
      <Button text="Login" callBack={handleSubmit} />
    </Wrapper>
  );
};
export default Login;
