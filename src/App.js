import React, {useState, useEffect, useLayoutEffect} from 'react';
//import getCoords from './utils/getCoords';
import {getCurrentWeather, getLocation} from './api/getDataFromApi'
import './App.css';

function App() {
    const [coords, setCoords] = useState({
        latitude: '',
        longitude: ''
    });
    const [location, setLocation] = useState({
        key: '',
        name: ''
    });

    const [curWeather, setCurWeather] = useState({
        weatherText: '',
        weatherIcon: null,
        hasPrecipitation: false,
        precipitationType: null,
        temperature: {}
    })

    const convertKeys = (obj) => {
        Object.keys(obj)
            .reduce((acc, key) => (acc[key.toLowerCase()] = obj[key], acc), {});
    };

    const getLocation = () => {
        const showLocation = (position) => {
            const { latitude, longitude } = position.coords;
            setCoords({ latitude, longitude });
        };
        const errorHandler = (err) => {
            if(err.code === 1) alert("Error: Access is denied!");
            if( err.code === 2) alert("Error: Position is unavailable!");
        };
        navigator.geolocation ?
            navigator.geolocation.getCurrentPosition(showLocation, errorHandler)
            : alert("Sorry, browser does not support geolocation!");
    }

    const getDataFromAPI = () => {
        const API_Key = 'eG2SeohPQfwFjIv8ihiTTvnASCNPzD1L';
        const baseUrl = 'http://dataservice.accuweather.com';
        const { latitude, longitude } = coords;
        fetch(`${baseUrl}/locations/v1/cities/geoposition/search?apikey=${API_Key}&q=${latitude},${longitude}`)
            .then(res => res.json())
            .then(json => {
                setLocation({
                    key: json.Key,
                    name: json.EnglishName
                });
                console.log('from API', location.key)
                fetch(`${baseUrl}/currentconditions/v1/${location.key}?apikey=${API_Key}`)
                    .then(res => res.json())
                    .then(json => {
                        convertKeys(json);
                        const { weatherText,
                            weatherIcon,
                            hasPrecipitation,
                            precipitationType,
                            temperature } = json;
                        setCurWeather({
                            weatherText,
                            weatherIcon,
                            hasPrecipitation,
                            precipitationType,
                            temperature
                        });
                        console.log('from API', curWeather);
                    });
            });
    };



    useEffect(() => {
        getLocation();
    }, []);

    useLayoutEffect(() => {
        getDataFromAPI()
    }, [coords]);

    console.log("from App",coords);
    console.log("from App",location);
    console.log("from App",curWeather);

      return (
        <div className="App">
          <h1>Show Local Weather</h1>
          {/*<span>{currentTemp}</span>*/}
        </div>
      );
}

export default App;
