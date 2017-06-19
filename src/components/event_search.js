import React, { Component } from 'react';
import $ from 'jquery';
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
      lon: `-74.014773`
      }
      // default: Carnegie Hall coordinates
    this.searchEvents = this.searchEvents.bind(this);
    this.updateTextSearch = this.updateTextSearch.bind(this);
  }

  componentDidMount(){
    this.searchEvents({lat: this.state.lat, lon: this.state.lon});
  }

  toQueryString(obj){
    let parts = [];
    for (let i in obj) {
        if (obj.hasOwnProperty(i) && obj[i] !== '') {
            parts.push(`${encodeURIComponent(i)}=${encodeURIComponent(obj[i])}`);
        }
    }
    return parts.join('&');
  }

  updateTextSearch(newText){
    this.setState({text: newText}, this.searchEvents);
  }

  searchEvents(){
    const queryString = this.toQueryString({
      lat: this.state.lat,
      lon: this.state.lon,
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
      })
  }

  render() {
    // debugger
    return (
      <div className="EventSearch">
        < SearchForm updateTextSearch={this.updateTextSearch} />
        < EventList events={this.state.events} />
        < MapContainer />
      </div>
    );
  }
}



export default EventSearch;
