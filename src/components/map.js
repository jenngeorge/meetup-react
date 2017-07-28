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

    this.markers = {};

    this.loadMap = this.loadMap.bind(this);
    this.SearchControl = this.SearchControl.bind(this);
  }

  componentDidMount(){
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.events !== this.props.events) {
      this.removeMarkers();
      this.setMarkers();
    }
    if (prevProps.activeEventId !== this.props.activeEventId){
      if (prevProps.activeEventId.length > 0){
        this.updateMarkerIcon(this.markers[prevProps.activeEventId], "deselect");
      }
      this.updateMarkerIcon(this.markers[this.props.activeEventId], "select");
    }
  }

  updateMarkerIcon(marker, status){
    if (status === "deselect"){
      marker.setIcon(this.unselectedMarkerIcon)
    } else {
      marker.setIcon(this.selectedMarkerIcon)
    }
  }

  removeMarkers(){
    const markerIds = Object.keys(this.markers);
    for (let i = 0; i < markerIds.length; i++) {
        this.markers[markerIds[i]].setMap(null);
    }
    this.markers = {};
  }

  setMarkers(){
    this.props.events.forEach(event => {
      if (event.venue && event.venue.lat && event.venue.lon){
        let position = new this.google.maps.LatLng(event.venue.lat, event.venue.lon)
        let marker = new this.google.maps.Marker({
          icon: this.unselectedMarkerIcon,
          position,
          map: this.map,
          message: event.name,
          eventId: event.id
        });
        this.markers[event.id] = marker;

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
      this.google = this.props.google;
      this.maps = this.google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = this.state.zoom;
      const center = new this.maps.LatLng(this.state.center.lat, this.state.center.lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom
      })
      this.map = new this.maps.Map(node, mapConfig);

      this.unselectedMarkerIcon = {
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: '#FF4081',
        fillOpacity: 0.7,
        scale: 0.5,
        strokeColor: '#FF4081',
        strokeWeight: 1
      }

      this.selectedMarkerIcon = {
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: '#4CAF50',
        fillOpacity: 1,
        scale: 0.7,
        strokeColor: '#388E3C',
        strokeWeight: 1
      }

      this.setMarkers();
      this.addMapListener();

      const controlDiv = document.createElement('div');
      this.SearchControl(controlDiv);

      controlDiv.index = 1;
      this.map.controls[this.google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
    }
  }

  addMapListener(){
    this.google.maps.event.addListener(this.map, 'idle', () => {
      const center = this.map.getCenter();
      const { north, west } = this.map.getBounds().toJSON();
      const northWest = new this.maps.LatLng(north, west)
      const radius = Math.floor(this.google.maps.geometry.spherical.computeDistanceBetween(center, northWest) / 1609.34) // meters in a mile;
      this.setState({center: {lat: `${center.lat()}`, lng: `${center.lng()}`},
        radius: `${radius}`,
        zoom: this.map.getZoom()});
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
