import React, { Component } from "react";

class Carousel extends Component {
  state = {
    photos: [],
    active: 0
  };

  handleIndexClick = e => {
    this.setState({
      active: e.target.dataset.index
    });
  };

  static getDerivedStateFromProps({ media }) {
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    return { photos };
  }

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active].value} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => {
            return (
              <img
                src={photo.value}
                key={photo.value}
                className={index === active ? "active" : ""}
                alt="animal thumbnail"
                onClick={this.handleIndexClick}
                data-index={index}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
