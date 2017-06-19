import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import EventSearch from './components/event_search';


class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        < EventSearch />
      </div>
    );
  }
}

export default App;
