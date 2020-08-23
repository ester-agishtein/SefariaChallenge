import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import googleMapStyles from "./GoogleMapStyles";
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
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
    let books = this.props.books;
    this.setState({ books: books });
    console.log("books = ", books);
    console.log("compo mounted");
    this.createMarkers();
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
    //need to create function for getting lat and lang --> look @
    //marker code in the marker branch.
    if (!this.isEmpty(this.state.books)) {
      console.log("this.state.books = ", this.state.books);
      this.state.books.map((book, i) => {
        console.log("book - ", book, " i = ", i);
        let title = Object.keys(book)[0];
        console.log("title = ", title);
        return <AnyReactComponent lat={0} lng={0} text={title} />;
      });
    }
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={2}
        style={{ height: "300px" }}
      >
        <AnyReactComponent 
          lat={59.955413} 
          lng={30.337844} 
          text={'Kreyser Avrora'} 
        />
      </GoogleMapReact>
    );
  }
}

SefariaMap.defaultProps = {
  center: { lat: 0, lng: 0 },
  zoom: 2
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAQTkpDi4CtMYoAuXxqaM65QOVaojEZc-w"
})(SefariaMap);
