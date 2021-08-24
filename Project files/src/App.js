import React from "react";

//Importing styles:
import { GlobalStyle } from "./GlobalStyle"; //No need to default export;
//Context:

import UserProvider from "./context";

//Importing components:
import Header from "./components/Header";
import Home from "./components/Home";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

//Routing:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //As means it's gonna be called under that name;

const App = () => (
  <Router>
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:movieId" element={<Movie />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <GlobalStyle />
    </UserProvider>
  </Router>
);
export default App;
