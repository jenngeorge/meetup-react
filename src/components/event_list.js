import React from 'react';
import EventItem from './event_item';

const EventList = (props) => {
    const indexItems = props.events.map(event => (
        <li key={event.id}>
            < EventItem event={event} />
        </li>
    ))

    return (
        <div className="event-index">
            <h1>Events</h1>
            <ul>
              {indexItems}
            </ul>
        </div>
    );
}

export default EventList;
