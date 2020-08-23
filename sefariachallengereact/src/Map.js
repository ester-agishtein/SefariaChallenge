import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import googleMapStyles from "./GoogleMapStyles";
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const CustomMarker = ({ title, date, author, location }) => (
    <div className="marker tooltip">
      {title}
      <div className="right">
        <h3>{title}</h3>
        <h1>{author}</h1>
        <h1>{date}</h1>
        <h1>{location}</h1>
        <i></i>
      </div>
    </div>
);

class SefariaMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  componentDidMount() {
    this.props.onRef(this);
    let books = this.props.books;
    this.setState({ books: books });
    console.log("books = ", books);
    console.log("map compo mounted");
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  selectActiveMarker = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  update = () => {
    let books = this.props.update();
    this.setState({ books: books });
    console.log("books returned from update = ", books);
  };

  createMarkers = () => {
    if (!this.isEmpty(this.state.books)) {
      console.log("this.state.books = ", this.state.books);
      this.state.books.map((book, i) => {
        console.log("book - ", book, " i = ", i);
        const metadata = Object.values(book)[0];
        if (metadata[3] != null) {
          const title = Object.keys(book)[0];
          const author = metadata[0] ? metadata[0][0] : "undefined";
          const date = metadata[1];
          const location = metadata[2];
          const lat = metadata[3][0];
          const lng = metadata[3][1];
          console.log("returning a marker!");
          return <CustomMarker lat={lat} lng={lng}
                               title={title}
                               date= {date}
                               author={author}
                               location={location} />;
        }
      });
    }
  };

  render() {
    return (
        <div style={{ height: '450px', position: 'relative'}}>
          <GoogleMapReact
              defaultCenter={{lat: 0, lng: 0}}
              defaultZoom={0}
          >
            {this.createMarkers()}
          </GoogleMapReact>
        </div>
    );
  }
}
SefariaMap.defaultProps = {
  center: { lat: 0, lng: 0 },
  zoom: 11
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAQTkpDi4CtMYoAuXxqaM65QOVaojEZc-w"
})(SefariaMap);
