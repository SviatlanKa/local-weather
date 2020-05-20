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
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isMetricSys: false,
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

            const { isMetricSys } = this.state;

            return fetch(`${baseUrl}/locations/v1/cities/geoposition/search?apikey=${API_Key}&q=${latitude},${longitude}`)
                .then(res => res.json())
                .then(json => {
                    const locationKey = json.Key;
                    this.setState({ name: json.EnglishName });

                    fetch(`${baseUrl}/currentconditions/v1/${locationKey}?apikey=${API_Key}&details=true`)
                        .then(res => res.json())
                        .then(json => {
                            json = convertKeys(json[0]);
                            const {
                                weatherText,
                                weatherIcon,
                                isDayTime,
                                hasPrecipitation,
                                precipitationType
                            } = json;
                            const temperature = isMetricSys ? json.temperature.Metric
                                : json.temperature.Imperial;
                            const realFeelTemperature = isMetricSys ? json.realFeelTemperature.Metric
                                : json.realFeelTemperature.Imperial;
                            const speed = isMetricSys ? json.wind.Speed.Metric : json.wind.Speed.Imperial;
                            const wind = { speed, direction: json.wind.Direction.English };
                            const visibility = isMetricSys ? json.visibility.Metric : json.visibility.Imperial;
                            this.setState({
                                curWeather: {
                                    weatherText,
                                    weatherIcon,
                                    isDayTime,
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
                                const temperature = isMetricSys ? convertToCelsuis(item.temperature.Value)
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
                                const maxTemperature = isMetricSys ? convertToCelsuis(item.Temperature.Maximum.Value)
                                    : item.Temperature.Maximum.Value;
                                const minTemperature = isMetricSys ? convertToCelsuis(item.Temperature.Minimum.Value)
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
            isMetricSys,
            curWeather,
            hours12ForecastArray,
            days5ForecastArray } = this.state;

        return (
            <div className="App">
                <CurrentWeather curWeather={curWeather} name={name} />
            </div>
        );
    }
}

export default App;
