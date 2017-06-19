import React, { Component } from 'react';
import wrapper from '../google_api_util/GoogleApiComponent';
import Map from './map';

//thanks to https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component

export class Container extends Component {
  render() {
    const style = {
      width: '500px',
      height: '500px'
    }

    if (!this.props.loaded) {
      return <div>Loading...</div>
    }
    return (
      <div style={style}>
        <Map google={this.props.google}
          />
      </div>
    )
  }
}

export default wrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_KEY
})(Container)