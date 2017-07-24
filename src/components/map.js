import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//thanks to https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#the-map-container-component

class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      center: this.props.center || {lat: `40.739527`, lng: `-74.014773`},
      zoom: this.props.zoom  || 14,
      radius: this.props.radius || '1'
      }

    this.loadMap = this.loadMap.bind(this);
    this.SearchControl = this.SearchControl.bind(this);
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
          message: event.name,
          eventId: event.id
        })
        marker.addListener('click', () => {
          console.log(`hi, I'm ${event.id}`);
          this.props.setActiveEvent(event.id)
        });
      }
    });
  }

  SearchControl(controlDiv){
    // Set CSS for the control border.
    const controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Redo search in map';
    controlDiv.appendChild(controlUI);

     // Set CSS for the control interior.
    const controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Redo search in map';
    controlUI.appendChild(controlText);


    const that = this;
    controlUI.addEventListener('click', () => {
     that.props.updateLocation(that.state.center, that.state.radius, this.state.zoom);
    });
  }

  loadMap(){
    if (this.props && this.props.google) {
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = this.state.zoom;
      const center = new maps.LatLng(this.state.center.lat, this.state.center.lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new maps.Map(node, mapConfig);

      this.setMarkers(this.props.events, google, this.map);
      this.addMapListener(this.map, maps,google);

      const controlDiv = document.createElement('div');
      this.SearchControl(controlDiv);

      controlDiv.index = 1;
      this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
    }
  }

  addMapListener(map, maps, google){
    google.maps.event.addListener(map, 'idle', () => {
      const center = map.getCenter();
      const { north, west } = this.map.getBounds().toJSON();
      const northWest = new maps.LatLng(north, west)
      const radius = Math.floor(google.maps.geometry.spherical.computeDistanceBetween(center, northWest) / 1609.34) // meters in a mile;
      this.setState({center: {lat: `${center.lat()}`, lng: `${center.lng()}`},
        radius: `${radius}`,
        zoom: map.getZoom()});
    });
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
