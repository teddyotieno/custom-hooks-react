import React, { useState, lazy, Suspense } from "react";
import NavBar from "./NavBar";
import { Router, Link } from "@reach/router";
import ThemeContext from "./ThemeContext";

const SearchParams = lazy(() => import("./SearchParams"));
const Details = lazy(() => import("./Details"));

const FourOhFour = () => {
  return <h1>Four oh Four</h1>;
};

const App = () => {
  const theme = useState("darkblue");
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <NavBar />
        <Suspense fallback={<h1>Stuff is loading</h1>}>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
            <FourOhFour default />
          </Router>
        </Suspense>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
