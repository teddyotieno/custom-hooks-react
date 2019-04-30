import React, { useState } from "react";
import SearchParams from "./SearchParams";
import Details from "./Details";
import { Router, Link } from "@reach/router";
import ThemeContext from "./ThemeContext";

const FourOhFour = () => {
  return <h1>Four oh Four</h1>;
};

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
          <FourOhFour default />
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
