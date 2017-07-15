import React, { Component } from 'react';
import $ from 'jquery';
import './EventSearch.css';
import SearchForm from './search_form';
import EventList from './event_list';
import MapContainer from './map_container';

class EventSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      text: '',
      lat: `40.739527`,
      lng: `-74.014773`,
      radius: '1',
      zoom: 14
      }
      // default: Carnegie Hall coordinates
    this.searchEvents = this.searchEvents.bind(this);
    this.updateTextSearch = this.updateTextSearch.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
  }

  componentDidMount(){
    this.searchEvents({lat: this.state.lat, lng: this.state.lng});
  }

  toQueryString(obj){
    let parts = [];
    for (let i in obj) {
        if (obj.hasOwnProperty(i) && obj[i] !== '' && obj[i] !== "") {
            parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
        }
    }
    return parts.join('&');
  }

  updateTextSearch(newText){
    this.setState({text: newText}, this.searchEvents);
  }

  updateLocation(newCenter, newRadius, newZoom){
    this.setState({
      lat: newCenter.lat,
      lng: newCenter.lng,
      radius: newRadius,
      zoom: newZoom}, this.searchEvents)
  }

  searchEvents(){
    const queryString = this.toQueryString({
      lat: this.state.lat,
      lon: this.state.lng,
      radius: this.state.radius,
      text: this.state.text
      })

    $.ajax({
      method: 'GET',
      dataType: 'jsonp',
      url: `https://api.meetup.com/find/events?key=${process.env.REACT_APP_MEETUP_KEY}&${queryString}`,
    }).then(response => {
        if (response.data){
          this.setState({events: response.data})
        }
      }, error => {
        debugger
        console.log(error)
      })
  }

  render() {
    debugger
    const center = {lat: this.state.lat, lng: this.state.lng};
    return (
      <div className="event-search-container">
        < SearchForm updateTextSearch={this.updateTextSearch} />
        <div className="left-container">
          < EventList events={this.state.events} />
        </div>
        < MapContainer
          events={this.state.events}
          updateLocation={this.updateLocation}
          center={center}/>
      </div>
    );
  }
}



export default EventSearch;
