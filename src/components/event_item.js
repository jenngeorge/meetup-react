import React, { Component } from 'react';
import "./EventItem.css";

class EventItem extends Component {
  constructor(props){
    super(props)
    this.state = {
      expanded: false
    }

    this.resizeDescription = this.resizeDescription.bind(this);
    this.escapedHTML = this.escapedHTML.bind(this);
  }

  resizeDescription(e){
    e.preventDefault();
    e.stopPropagation();
    if (this.state.expanded){
      this.setState({expanded: false});
    } else {
      this.setState({expanded: true});
    }
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
        <h2 className="group-name">Group: {event.group.name}</h2>
        <h3 className="event-link">
          <a href={`${event.link}`} target="_blank">
            Link to Meetup event page
          </a>
        </h3>
        <h3 className="time"> {date.toLocaleDateString()} {date.toLocaleTimeString()}</h3>
        <div className={this.state.expanded ? "description-full" : "description-collapsed" }
          dangerouslySetInnerHTML={this.escapedHTML(event.description)}></div>
        <div className="resize-description" onClick={this.resizeDescription}>
          {this.state.expanded ? "- collapse details - " : "+ expand  details +"}
        </div>
        <h3 className="rsvps">{event.yes_rsvp_count} RSVPs</h3>
      </div>
    );
  }

}

export default EventItem;
