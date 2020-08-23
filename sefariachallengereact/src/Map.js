import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import googleMapStyles from "./GoogleMapStyles";
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const CustomMarker = ({ text }) => (
    <div style={{
      color: 'white', 
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
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
            defaultCenter={{lat: 0, lng: 0}}
            defaultZoom={2}
        >
            {(!this.isEmpty(this.state.books)) && 
                this.state.books.map((book, i) => { 
                  console.log(book)
                  let title = Object.keys(book)[0];
                  return <CustomMarker lat={0} lng={0} text={title} />;
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
