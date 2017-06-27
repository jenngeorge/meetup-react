import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//thanks to https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component

class Map extends Component {

  // TODO: listen for map being dragged around
  // TODO: listen for map zoom change
// TODO: marker things

  constructor(props) {
    super(props)
    this.state = {
      center: this.props.center || {lat: `40.739527`, lng: `-74.014773`},
      zoom: 14
      }
  }

  componentDidMount(){
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.loadMap();
    }
  }

  setMarkers(events, google, map){

    events.forEach(event => {
      if (event.venue && event.venue.lat && event.venue.lon){
        let position = new google.maps.LatLng(event.venue.lat, event.venue.lon)
        let marker = new google.maps.Marker({
          position,
          map: map,
          message: event.name
        })
        marker.addListener('click', () => console.log(`hi, I'm ${event.name}`));
      }
    });
  }

  loadMap(){
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 13;
      const center = new maps.LatLng(this.state.center.lat, this.state.center.lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);

      this.setMarkers(this.props.events, google, this.map);
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
