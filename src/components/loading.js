import React from 'react';
import ReactDOM from 'react-dom';
import './Loading.css';

const Loading = () => {

  const unselectedMarkerIcon = {
    path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
    fillColor: '#FF4081',
    fillOpacity: 0.7,
    scale: 0.5,
    strokeColor: '#FF4081',
    strokeWeight: 1
  }

  return (
    <div className="loading-container">
      <h3> Waiting for the Meetup API... </h3>
      <div className="loading-icon">
        <svg viewBox="-30 -30 60 10" width="200" height="200" >
        <path fill="#FF4081"  stroke="#FF4081"
        d="M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z"
        fillOpacity="0.7" strokeOpacity="1" />
      </svg>
      </div>
    </div>
  );
}

export default Loading;
