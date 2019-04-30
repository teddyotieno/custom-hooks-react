import React, { Component } from "react";
import Carousel from "./Carousel";
import pf from "petfinder-client";
import Modal from "./Modal";

const petfinder = pf();

class Details extends Component {
  state = {
    loading: true,
    showModal: false
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
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };
  render() {
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
