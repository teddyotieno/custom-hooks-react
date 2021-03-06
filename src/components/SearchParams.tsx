import React, { useState, useEffect, FunctionComponent } from "react";
import pf, { ANIMALS, Pet } from "petfinder-client";
import useDropdown from "../hooks/useDropdown";
import Results from "./Results";
import { RouteComponentProps } from "@reach/router";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No api keys provided");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const SearchParams: FunctionComponent<RouteComponentProps> = () => {
  const [pets, setPets] = useState([] as Pet[]);
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([] as string[]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "Dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  async function fetchPets() {
    const res = await petfinder.pet.find({
      location,
      breed,
      animal,
      output: "full"
    });
    setPets(res.petfinder.pets.pet);
  }

  useEffect(() => {
    setBreed("");
    setBreeds([]);
    petfinder.breed.list({ animal }).then(res => {
      setBreeds(res.petfinder.breeds.breed);
    });
  }, [animal]);

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          fetchPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            onChange={e => setLocation(e.target.value)}
            id="location"
            placeholder="Location"
            value={location}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
