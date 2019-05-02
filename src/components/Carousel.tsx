import React, { Component } from "react";
import { PetMedia, PetPhoto } from "petfinder-client";

interface IProps {
  media: PetMedia;
}
class Carousel extends Component<IProps> {
  public state = {
    photos: [] as PetPhoto[],
    active: 0
  };

  public handleIndexClick = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({
      active: e.target.dataset.index
    });
  };

  public static getDerivedStateFromProps({ media }: { media: PetMedia }) {
    let photos: PetPhoto[] = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }
    return { photos };
  }

  public render() {
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
