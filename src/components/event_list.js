import React from 'react';
import EventItem from './event_item';
import './EventList.css';

const EventList = (props) => {
    const indexItems = props.events.map(event => (
        <li key={event.id}>
            < EventItem event={event} />
        </li>
    ))

    return (
        <div className="event-list-container">
            <ul>
              {indexItems}
            </ul>
        </div>
    );
}

export default EventList;
