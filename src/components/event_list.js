import React from 'react';
import EventItem from './event_item';
import './EventList.css';

const EventList = (props) => {
    const indexItems = props.events.map(event => {
      if (event.id === props.activeEventId){
        return (
            <li key={event.id} id={event.id} className="active-event">
                < EventItem event={event} />
            </li>
        )
      }
      else if ((event.venue && event.venue.lat && event.venue.lon)){
        return (
            <li key={event.id}>
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

export default EventList;
