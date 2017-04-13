import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';

import { Tabs, Tab } from 'react-bootstrap';

const PLACES = [
  { name: 'San Jose', zip: '94088' },
  { name: 'Santa Cruz', zip: '95062' },
  { name: 'Honolulu', zip: '96803' },
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = 'http://api.openweathermap.org/data/2.5/weather?q='+zip+'&appid=b1b35bba8b434a28a0be2a3e1071ae5b'
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    return (
      <h2>{weatherData.weather[0].main}</h2>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  _handleSelect = (index) => {
    this.setState({ activePlace: index });
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className="App">
        <Tabs activeKey={activePlace} onSelect={this._handleSelect}>
          {PLACES.map((place, index) => (
            <Tab
              key={index}
              eventKey={index}
              title={place.name}
            />
          ))}
        </Tabs>
        <WeatherDisplay
          key={activePlace}
          zip={PLACES[activePlace].zip}
        />
      </div>
    );
  }
}

export default App;
