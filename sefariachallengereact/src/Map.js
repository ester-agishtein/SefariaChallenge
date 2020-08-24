import { GoogleApiWrapper } from "google-maps-react";
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
    this.setState({ books: this.props.books });
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
      //console.log("this.state.books = ", this.state.books);
      this.state.books.map((book, i) => {
        //console.log("book - ", book, " i = ", i);
        const metadata = Object.values(book)[0];
        if (metadata[3] != null) {
          const title = Object.keys(book)[0];
          const author = metadata[0] ? metadata[0][0] : "undefined";
          const date = metadata[1];
          const location = metadata[2];
          const lat = metadata[3][0];
          const lng = metadata[3][1];
          console.log("returning a marker!");
          return <CustomMarker 
            lat={lat} lng={lng}
            title={title}
            date= {date}
            author={author}
            location={location} 
          />;
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

            {(!this.isEmpty(this.state.books)) &&
                this.state.books.map((book, i) => {
                let title = Object.keys(book)[0];
                const metadata = Object.values(book)[0]
                if (metadata[3] != null) {
                    return <CustomMarker 
                            lat={metadata[3][0]} lng={metadata[3][1]} 
                            title={title}
                            date={metadata[1]}
                            author={metadata[0] ? metadata[0][0] : ""}
                            location={metadata[2]}
                            />;
                }
                })
            }

          </GoogleMapReact>
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAQTkpDi4CtMYoAuXxqaM65QOVaojEZc-w"
})(SefariaMap);
