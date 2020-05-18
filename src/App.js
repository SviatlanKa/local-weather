import React, { Component } from 'react';
import CurrentWeather from './components/current-weather/CurrentWeather';
import './App.css';

const convertKeys = obj => {
    return Object.keys(obj)
        .reduce((acc, key) => {
            let newKey = key.charAt(0).toLowerCase() + key.slice(1);
            acc[newKey] = obj[key];
            return acc
        }, {});
};

const convertToCelsuis = temp => {
    return (temp - 32) * 5 / 9;
}

// let hours12Forecast = {
//     time: '',
//     weatherIcon: null,
//     temperature: {},
//     precipitationProbability: null
// };

// let days10Forecast = {
//     date: '',
//     dayWeatherIcon: null,
//     maxTemperature: null,
//     minTemperature: null
// };

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isCelsius: false,
            curWeather: {
                weatherText: '',
                weatherIcon: null,
                hasPrecipitation: false,
                precipitationType: null,
                precipitationProbability: null,
                temperature: null,
                realFeelTemperature: {},
                wind: {},
                visibility: {}
            },
            hours12ForecastArray: [],
            days5ForecastArray: []
        }
    }

    componentDidMount() {
        const showLocation = (position) => {
            const { latitude, longitude } = position.coords;
            const API_Key = 'eG2SeohPQfwFjIv8ihiTTvnASCNPzD1L';
            const baseUrl = 'http://dataservice.accuweather.com';

            return fetch(`${baseUrl}/locations/v1/cities/geoposition/search?apikey=${API_Key}&q=${latitude},${longitude}`)
                .then(res => res.json())
                .then(json => {
                    const locationKey = json.Key;
                    this.setState({ name: json.EnglishName });

                    fetch(`${baseUrl}/currentconditions/v1/${locationKey}?apikey=${API_Key}`)
                        .then(res => res.json())
                        .then(json => {
                            json = convertKeys(json[0]);
                            const {
                                weatherText,
                                weatherIcon,
                                hasPrecipitation,
                                precipitationType,
                                realFeelTemperature,
                                wind,
                                visibility
                            } = json;
                            const temperature = this.state.isCelsius ? json.temperature.Metric.Value
                                : json.temperature.Imperial.Value;
                            this.setState({
                                curWeather: {
                                    weatherText,
                                    weatherIcon,
                                    hasPrecipitation,
                                    precipitationType,
                                    temperature,
                                    realFeelTemperature,
                                    wind,
                                    visibility
                                }
                            });
                        });

                    fetch(`${baseUrl}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_Key}`)
                        .then(res => res.json())
                        .then(json => {
                            let hours12ForecastArray = [];
                            json.map(item => {
                                item = convertKeys(item);
                                const {
                                    weatherIcon,
                                    precipitationProbability
                                } = item;
                                const time = item.dateTime;
                                const temperature = this.state.isCelsius ? convertToCelsuis(item.temperature.Value)
                                    : item.temperature.Value;
                                hours12ForecastArray.push({
                                        time,
                                        weatherIcon,
                                        temperature,
                                        precipitationProbability
                                    });
                                return hours12ForecastArray;
                            });
                            this.setState({ hours12ForecastArray });
                        });

                    fetch(`${baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_Key}`)
                        .then(res => res.json())
                        .then(json => {
                            let days5ForecastArray = [];
                            json.DailyForecasts.map(item => {
                                const date = item.Date;
                                const dayWeatherIcon = item.Day.Icon;
                                const maxTemperature = this.state.isCelsius ? convertToCelsuis(item.Temperature.Maximum.Value)
                                    : item.Temperature.Maximum.Value;
                                const minTemperature = this.state.isCelsius ? convertToCelsuis(item.Temperature.Minimum.Value)
                                    : item.Temperature.Minimum.Value;
                                days5ForecastArray.push({
                                    date,
                                    dayWeatherIcon,
                                    maxTemperature,
                                    minTemperature
                                });
                                return days5ForecastArray;
                            });
                            this.setState({ days5ForecastArray });
                        });
                })
                .catch(error => console.log(error.message));

        };
        const errorHandler = (err) => {
            if(err.code === 1) alert("Error: Access is denied!");
            if( err.code === 2) alert("Error: Position is unavailable!");
        };
        navigator.geolocation ?
            navigator.geolocation.getCurrentPosition(showLocation, errorHandler)
            : alert("Sorry, browser does not support geolocation!");
    }

    render() {
        const { name,
            isCelsius,
            curWeather,
            hours12ForecastArray,
            days5ForecastArray } = this.state;

        return (
            <div className="App">
                <h1>Show Local Weather</h1>
                <span>{curWeather.temperature}</span>
                <CurrentWeather curWeather={curWeather}>

                </CurrentWeather>

            </div>
        );
    }
}

export default App;
