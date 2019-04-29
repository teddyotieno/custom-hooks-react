import React from "react";
import SearchParams from "./SearchParams";
import Details from "./Details";
import { Router, Link } from "@reach/router";

const FourOhFour = () => {
  return <h1>Four oh Four</h1>;
};

const App = () => {
  return (
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
  );
};

export default App;
