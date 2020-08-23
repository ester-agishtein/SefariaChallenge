import { Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import googleMapStyles from './GoogleMapStyles';
import React from "react";


export {Maps}


class Maps extends React.Component {

    constructor() {
        super(props)



        this.state = {
            exampleMarkers: [
                {latitude: 47.359423, longitude: -122.021071},
                {latitude: 47.2052192687988, longitude: -121.988426208496},
                {latitude: 47.6307081, longitude: -122.1434325},
                {latitude: 47.3084488, longitude: -122.2140121},
                {latitude: 47.5524695, longitude: -122.0425407}],
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            INITIAL_MAP_ZOOM_LEVEL: 2,
            INITIAL_LOCATION: {
                position: {
                    latitude: 15.929115,
                    longitude: -11.085527
                }
            }
        }

    }

    componentDidMount() {
        var mapElement = this.mapElement;
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: { lat: 41.0082, lng: 28.9784 },
            zoom: 8
        });

        this.map = new this.google.maps.Map(mapElement, {
            zoom: this.state.INITIAL_MAP_ZOOM_LEVEL,
            center: {
                lat: this.state.INITIAL_LOCATION.position.latitude,
                lng: this.state.INITIAL_LOCATION.position.longitude
            }
        });

      /*  this.marker = new google.maps.Marker({
            map: this.map,
            position: {
                lat: INITIAL_LOCATION.position.latitude,
                lng: INITIAL_LOCATION.position.longitude
            }
        });*/

        this.geocoder = new google.maps.Geocoder();
    }

    setSearchInputElementReference(inputReference) {
        this.searchInputElement = inputReference;
    }

    setMapElementReference(mapElementReference) {
        this.mapElement = mapElementReference;
    }

    render() {
        return(<div style={{ width: 500, height: 500 }} id="map" />)
    }

    closeOverlay() {
        this.setState(nS => { this.DashboardDataService.settingsWidgetId = undefined })
    }


    Maps.defaultProps = googleMapStyles;

    containerStyle: {
        position: 'relative',
        width: '100%',
        height: '450px'
    }

}



/*
import { Map, Marker, GoogleApiWrapper, InfoWindow} from 'google-maps-react';
import googleMapStyles from './GoogleMapStyles';
import React, { Component } from "react";

export class Maps extends Component {

    constructor(props) {
        super(props);

        this.state = {
            exampleMarkers: [
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
              {/!* onClick={this.onMapClicked}>*!/}
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








*/
