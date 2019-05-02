import React from "react";
import { Link } from "@reach/router";
import { PetMedia } from "petfinder-client";

interface IProps {
  name: string;
  animal: string;
  breed: string;
  media: PetMedia;
  location: string;
  id: string;
}
const Pet = ({ name, animal, breed, media, location, id }: IProps) => {
  const hero = media.photos.photo.length
    ? media.photos.photo[0].value
    : "http://placecorgi.com/300/300";

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};
export default Pet;
