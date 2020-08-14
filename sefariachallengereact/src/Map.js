import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import googleMapStyles from "./GoogleMapStyles";
import React, { Component } from "react";
import Geocode from "react-geocode";
const { v4: uuidv4 } = require("uuid");
export class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    Geocode.setApiKey("AIzaSyBKeRT9s4EDUZhDdpsGZNr7QH181vFIfj8");
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={2}
        streetViewControl={false}
        styles={this.props.silver}
        containerStyle={containerStyle}
        initialCenter={{ lat: 15.929115, lng: -11.085527 }}
      >
        {/* onClick={this.onMapClicked}>*/}
        {this.displayMarkers(this.props)}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }

  getCountry = country => {
    var coords = [];
    Geocode.fromAddress(country).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        coords.push(lat);
        coords.push(lng);
        console.log("lat = ", lat, " lng = ", lng);
      },
      error => {
        console.error(error);
      }
    );
    return coords;
  };

  displayMarkers = props => {
    console.log("this.props.books = ", this.props.books);
    let bookList = this.props.books[0];
    console.log("bookList = ", bookList, " type = ", typeof bookList);
    let books = Object.values(bookList);
    let bookArray = [];
    for (let bookIndex in books) {
      let book = books[bookIndex];
      console.log("book = ", book);
      bookArray.push(book);
    }
    bookArray.map(book => {
      var authors = book[0];
      var date = book[1];
      var place = book[2];
      var coords = this.getCountry(place);
      var uuid = uuidv4();
      //   Map.js:49 lat =  40.79002089999999  lng =  -73.9526456
      return (
        <Marker
          key={uuid}
          id={uuid}
          position={{ lat: 40.79002089999999, lng: -73.9526456 }}
          onMouseover={this.onMouseover}
          name={authors}
        ></Marker>
      );
    });
  };

  onMouseover = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
}

Maps.defaultProps = googleMapStyles;

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "450px"
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAQTkpDi4CtMYoAuXxqaM65QOVaojEZc-w"
})(Maps);
