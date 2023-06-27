import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class GoodleMap extends Component {
    render() {

        if (!this.props.loaded) {
            return <div>Loading...</div>;
          }

        const state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {}
          };

        return (
            <div className="App">

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '10%', height: '500px',marginLeft:'10px' }} >

                    <Map google={this.props.google} zoom={14}>

                        <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />

                        <InfoWindow onClose={this.onInfoWindowClose} >
                            <div>
                                {/* <h1>{this.state.selectedPlace.name}</h1> */}
                            </div>

                        </InfoWindow>
                    </Map>
                </div>

            </div>
        )
    };
}


export default GoogleApiWrapper({
    apiKey: ("AIzaSyA7qIDP9QJcy5IfCITvJlZBIIWxJFgj05A")
})(GoodleMap)