import React from 'react';

const EventList = (props) => {
    const indexItems = props.events.map(event => (
        <div key={event.id}>
            {event.name}
        </div>
    ))

    return (
        <div className="event-index">
            <h1>Events</h1>
            {indexItems}
        </div>
    );
}

export default EventList;
