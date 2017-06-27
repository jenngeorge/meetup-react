import React from 'react';

const EventItem = ({event}) => {
    const date = new Date(event.time);

    return (
        <div className="event-item">
            <h5>{event.name}</h5>
            <h6>group: {event.group.name}</h6>
            <p> time: {date.toString()}</p>
            <p>{event.description}</p>
            <p>{event.yes_rsvp_count} rsvp'd </p>
            <a>{event.link}</a>
        </div>
    );
}

export default EventItem;
