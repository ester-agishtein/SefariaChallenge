import { GoogleApiWrapper } from "google-maps-react";
import googleMapStyles from "./GoogleMapStyles.json";
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const CustomMarker = ({ title, date, author, location }) => (
    <div className="marker tooltip">
      {title}
      <div className="right">
        <h1>{title}</h1>
        <h3>Author: {author}</h3>
        <h3>Written: {date < 0 ? (date * -1) + " BCE" : date }</h3>
        <h3>Location: {location}</h3>
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
  };

  render() {
    return (
        <div style={{ height: '450px', position: 'relative'}}>
          <GoogleMapReact
              defaultCenter={{lat: 29.023360, lng: 33.799610}}
              defaultZoom={0}
              options={{
                styles: googleMapStyles
              }}
          >

            {(!this.isEmpty(this.state.books)) &&
                this.state.books.map((book, i) => {
                let title = Object.keys(book)[0];
                const metadata = Object.values(book)[0];
                if (metadata[3] != null) {
                    return <CustomMarker 
                            lat={metadata[3][0]} lng={metadata[3][1]} 
                            title={title}
                            date={metadata[1]}
                            author={metadata[0] ? metadata[0][0] : "unknown"}
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
