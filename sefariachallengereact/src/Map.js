import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import googleMapStyles from './GoogleMapStyles';
import React from "react";

export class Maps extends React.Component {
    render() {
        return (
            <Map
        google={this.props.google}
        zoom={3}
        styles={this.props.silver}
            >
            </Map>
    );
    }
}

Maps.defaultProps = googleMapStyles;

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAQTkpDi4CtMYoAuXxqaM65QOVaojEZc-w'
})(Maps);

