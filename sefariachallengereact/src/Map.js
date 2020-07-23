import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import googleMapStyles from './GoogleMapStyles';
import React, { Component } from "react";

export class Maps extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={2}
                styles={this.props.silver}
                containerStyle={containerStyle}
                initialCenter={{ lat: 15.929115, lng: -11.085527 }}
            />
    );
    }
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

