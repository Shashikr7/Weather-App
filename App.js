import React, { useState } from 'react'
import axios from 'axios'
import { createContext } from 'react';
import ReactSwitch from 'react-switch';

import moment from 'moment';


export const ThemeContext = createContext(null)

function App() {
  const [data, setData] = useState({})
  const [city, setLocation] = useState('')





  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=67c04a2de4089fa7fb81b7b5dcee2749`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((Response) => {
        setData(Response.data)
        console.log(Response.data.main)
      })
      setLocation(' ')

    }



  }

  return (
    <div className="app">
      

      <div className="search">
        <input
          value={city}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text" />

          <div className='datetime'><b>{moment().format('MMMM Do YYYY,  h:mm:ss a')}</b></div>
      </div>
      
      <div className="container">

        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
         
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name != undefined &&
          <div className="bottom">
            <div className="Feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity.toFixed()}%</p> : null}

              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
