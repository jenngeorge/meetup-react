import React, { Component } from 'react';
import EventItem from './event_item';
import './EventList.css';

class EventList extends Component {
  constructor(props){
    super(props)
  }

  componentDidUpdate(prevProps){
    if (prevProps.activeEventId !== this.props.activeEventId &&
      this.props.activeEventId !== ""){
      this.refs[this.props.activeEventId].scrollIntoView({block: 'end',
      behavior: 'smooth'});
    }
  }

  render(){
    const indexItems = this.props.events.map(event => {
      if ((event.venue && event.venue.lat && event.venue.lon)){
        return (
            <li key={event.id} id={event.id} ref={event.id}
              className={event.id === this.props.activeEventId ? "active-event" : ""}>
                < EventItem event={event}
                  setActiveEvent={this.props.setActiveEvent}/>
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
