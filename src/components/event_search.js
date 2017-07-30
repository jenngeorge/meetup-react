import React, { Component } from 'react';
import $ from 'jquery';
import './EventSearch.css';
import SearchForm from './search_form';
import EventList from './event_list';
import MapContainer from './map_container';
import Loading from './loading';

class EventSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: [],
      text: '',
      lat: `40.739527`,
      lng: `-74.014773`,
      radius: '1',
      zoom: 14,
      activeEventId: "",
      loading: true
      }
      // default: Carnegie Hall coordinates
    this.searchEvents = this.searchEvents.bind(this);
    this.updateTextSearch = this.updateTextSearch.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.setActiveEvent = this.setActiveEvent.bind(this);
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
    console.log('searching..');
    this.setState({loading: true});

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
          this.setState({events: response.data, activeEventId: "", loading: false});
        }
      }, error => {
        console.log(error);
        console.log("error with Meetup query");
      })
  }

  setActiveEvent(eventId){
    this.setState({activeEventId: eventId});
  }

  render() {
    let loadingComponent;
    if (this.state.loading === true){
      loadingComponent = <Loading />
    }

    let noEvents;
    if (this.state.events.length === 0){
      noEvents = (<div className="no-events">
        <h3>There are no events to display!</h3>
        <h3>Try another search </h3>
      </div>);
    }
    const center = {lat: this.state.lat, lng: this.state.lng};
    return (
      <div className="event-search-container">
        {loadingComponent}
        < SearchForm updateTextSearch={this.updateTextSearch}
          currentText={this.state.text}/>
        <div className="left-container">
          {noEvents}
          < EventList events={this.state.events}
            activeEventId={this.state.activeEventId}
            setActiveEvent={this.setActiveEvent}/>
        </div>
        < MapContainer
          events={this.state.events}
          updateLocation={this.updateLocation}
          center={center}
          activeEventId={this.state.activeEventId}
          setActiveEvent={this.setActiveEvent}/>
      </div>
    );
  }
}



export default EventSearch;
