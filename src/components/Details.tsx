import React, { Component } from "react";
import { RouteComponentProps, navigate } from "@reach/router";
import Carousel from "./Carousel";
import pf, { PetMedia } from "petfinder-client";
import Modal from "./Modal";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No api keys provided");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

interface IProps {
  id: string;
}

class Details extends Component<RouteComponentProps<IProps>> {
  public state = {
    loading: true,
    showModal: false,
    name: "",
    animal: "",
    breed: "",
    location: "",
    description: "",
    media: {} as PetMedia
  };
  public componentDidMount() {
    if (!this.props.id) {
      navigate("/");
      return;
    }
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
  public toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
  public render() {
    const {
      animal,
      breed,
      location,
      description,
      name,
      media,
      showModal
    } = this.state;

    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button onClick={this.toggleModal}>Adopt {name}</button>
          <p>{description}</p>
        </div>
        {this.state.showModal ? (
          <Modal>
            {" "}
            <div>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.toggleModal}>Yes</button>
                <button onClick={this.toggleModal}>Defnitely Yes</button>
              </div>
            </div>{" "}
          </Modal>
        ) : null}
      </div>
    );
  }
}
export default Details;
