import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import googleMapStyles from "./GoogleMapStyles";
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class AnyReactComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }
  render() {
    return (
      <div>
        <h1>HEEEY</h1>
      </div>
    );
  }
}
class SefariaMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  componentDidMount() {
    console.log("called by parrent");
    // this.createMarkers();
  }
  calledByParent() {
    console.log("i'm called");
  }
  createMarkers(props) {
    console.log("props = ", this.props);
    //   {this.state.markers.map((marker, i) => {
    //       return (
    //         <div onClick={this.selectActiveMarker}>
    //           lat={marker.lat}
    //           lng={marker.lng}
    //           img_src={marker.img_src}
    //         </div>
    //       );
    //     })}
  }
  selectActiveMarker = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  render() {
    return (
      <GoogleMapReact
        defaultCenter={this.props.center}
        defaultZoom={11}
        style={{ height: "300px" }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={this.createMarkers}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    );
  }
}
SefariaMap.defaultProps = {
  center: { lat: 59.95, lng: 30.33 },
  zoom: 11
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAQTkpDi4CtMYoAuXxqaM65QOVaojEZc-w"
})(SefariaMap);
