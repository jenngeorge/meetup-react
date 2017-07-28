import React, { Component } from 'react';
import wrapper from '../google_api_util/GoogleApiComponent';
import Map from './map';

//thanks to https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component

export class Container extends Component {
  render() {
    const style = {
      width: '67vw',
      height: '90vh'
    }

    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={style}>
        <Map google={this.props.google}
          center={this.props.center}
          events={this.props.events}
          updateLocation={this.props.updateLocation}
          setActiveEvent={this.props.setActiveEvent}
          activeEventId={this.props.activeEventId}
          />
      </div>
    )
  }
}

export default wrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
})(Container)
