import React, { Component } from 'react';
import EventItem from './event_item';
import './EventList.css';

class EventList extends Component {
  constructor(props){
    super(props)
  }

  componentDidUpdate(nextProps){
    if (nextProps.activeEventId !== this.props.activeEventId){
      this.refs[this.props.activeEventId].scrollIntoView({block: 'end',
      behavior: 'smooth'});
    }
  }

  render(){
    const indexItems = this.props.events.map(event => {
      if (event.id === this.props.activeEventId){
        return (
            <li key={event.id} id={event.id} ref={event.id}
              className="active-event">
                < EventItem event={event} />
            </li>
        )
      }
      else if ((event.venue && event.venue.lat && event.venue.lon)){
        return (
            <li key={event.id} id={event.id} ref={event.id}>
                < EventItem event={event} />
            </li>
        )
      }
    });
    return (
        <div className="event-list-container">
            <ul>
              {indexItems}
            </ul>
        </div>
    );
  }
}

export default EventList;
