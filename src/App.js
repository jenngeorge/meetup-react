import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {events: []}
    this.searchEvents = this.searchEvents.bind(this);
  }

  componentDidMount(){
    $.ajax({
      method: 'GET',
      dataType: 'jsonp',
      url: `https://api.meetup.com/find/events?key=${process.env.REACT_APP_MEETUP_KEY}&text=tech`,
    }).then(response => {
        debugger
        if (response.data){
          this.setState({events: response.data})
        }
      })
  }

  searchEvents(){
    debugger
  }

  render() {
    debugger
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;

//
// export const getEvents = (params) => {
//     let requestUrl = 'https://api.meetup.com/find/events?sig_id=152336072&sig=bbdb62c39c10a55e0ed9442f3c335264e21e0cd5&';
//     requestUrl += toQueryString(params);
//     console.log(requestUrl)
//     return $.ajax({
//         type: 'GET',
//         url: requestUrl,
//         dataType: 'jsonp'
//     });
// };
