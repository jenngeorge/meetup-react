import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//thanks to https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      center: this.props.center || {lat: `40.739527`, lon: `-74.014773`},
      zoom: 14
      }
  }

  componentDidMount(){
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap(){
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);
    }
  }

  render() {
    const style = {width: '100%', height: '100%'};
    return (
      <div ref='map' style={style}>
        Loading map...
      </div>
    );
  }

}

export default Map;
