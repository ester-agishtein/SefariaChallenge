import { Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import googleMapStyles from './GoogleMapStyles';
import React, { Component } from "react";

export class Maps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            exampleMarkers: [
                 {lat: 47.49855629475769, lng: -122.14184416996333},
                {latitude: 47.359423, longitude: -122.021071},
                {latitude: 47.2052192687988, longitude: -121.988426208496},
                {latitude: 47.6307081, longitude: -122.1434325},
                {latitude: 47.3084488, longitude: -122.2140121},
                {latitude: 47.5524695, longitude: -122.0425407}],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
    }

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={2}
                streetViewControl={false}
                styles={this.props.silver}
                containerStyle={containerStyle}
                initialCenter={{ lat: 15.929115, lng: -11.085527 }}>
              {/* onClick={this.onMapClicked}>*/}
                {this.displayMarkers()}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        );
    }

    displayMarkers = () => {
        return this.state.exampleMarkers.map((marker, index) => {
            return <Marker
                        key={index}
                        id={index}
                        position={{lat: marker.latitude, lng: marker.longitude}}
                        onMouseover={this.onMouseover}
                        name={'Hi there!'}>
                </Marker>
        })
    }


    onMouseover = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });



}

Maps.defaultProps = googleMapStyles;

const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '450px'
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAQTkpDi4CtMYoAuXxqaM65QOVaojEZc-w'
})(Maps);








