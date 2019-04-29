import React, { Component } from "react";
import Carousel from "./Carousel";
import pf from "petfinder-client";

const petfinder = pf();

class Details extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    petfinder.pet.get({ id: this.props.id, output: "full" }).then(data => {
      this.setState({
        name: data.petfinder.pet.name,
        animal: data.petfinder.pet.animal,
        location: `${data.petfinder.pet.contact.city} , ${
          data.petfinder.pet.contact.state
        }`,
        description: data.petfinder.pet.description,
        media: data.petfinder.pet.media,
        breed: data.petfinder.pet.breeds.breed,
        loading: false
      });
    });
  }
  render() {
    const { animal, breed, location, description, name, media } = this.state;

    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
export default Details;
