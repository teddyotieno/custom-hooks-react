import React, { FunctionComponent } from "react";
import { Pet as IPet } from "petfinder-client";
import Pet from "./Pet";

interface IProps {
  pets: IPet[];
}
const Results: FunctionComponent<IProps> = ({ pets }) => {
  return (
    <div className="search">
      {pets.length === 0 ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map(pet => (
          <Pet
            animal={pet.animal}
            key={pet.id}
            name={pet.name}
            breed={pet.breeds.breed}
            media={pet.media}
            location={`${pet.contact.city}, ${pet.contact.state}`}
            id={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
