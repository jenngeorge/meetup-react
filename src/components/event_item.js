import React, { Component } from 'react';
import "./EventItem.css";

class EventItem extends Component {
  constructor(props){
    super(props)

    this.escapedHTML = this.escapedHTML.bind(this);
  }

  escapedHTML(html){
    if (html) {
      html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }
    return {__html: html};
  }

  render(){
    const event = this.props.event;
    const date = new Date(event.time);
    return (
      <div className="event-item" onClick={this.props.setActiveEvent.bind(this, event.id)}>
        <h1 className="event-name">{event.name}</h1>
        <a className="event-link" href={`${event.link}`}>{event.link}</a>
        <h3 className="time"> {date.toString()}</h3>
        <h2 className="group-name">group: {event.group.name}</h2>
        <div className="description" dangerouslySetInnerHTML={this.escapedHTML(event.description)}></div>
        <h3 className="rsvps">{event.yes_rsvp_count} RSVPs</h3>
      </div>
    );
  }

}

export default EventItem;
