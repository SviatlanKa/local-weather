import React, { useState, useEffect } from 'react';
import {
    convertKeys,
    findImageName,
    convertToCelsius,
    convertToMetersInSec, findBackgroundUrl
} from './utils/utils';
import Spinner from "./components/spinner/Spinner";
import SetUnitButton from "./components/set-unit-button/SetUnitButton";
import CurrentWeather from './components/current-weather/CurrentWeather';
import HourlyForecast from "./components/hourly-forecast/HourlyForecast";
import DailyForecast from "./components/daily-forecast/DailyForecast";
import { GEOPOSITION } from "./responses/geoposition";
import { CUR_WEATHER } from "./responses/current_weather";
import { DAILY_FORECAST } from "./responses/daily_forecast";
import { HOURLY_FORECAST } from "./responses/hourly_forecast";
import './App.css';

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const initCurWeather = {
    weatherText: '',
    weatherIcon: null,
    isDayTime: true,
    temperature: {},
    realFeelTemperature: {},
    wind: { speed: {}, direction: ''},
    visibility: {}
};

const App = () => {
    const [isMetricSys, setIsMetricSys] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [err, setErr] = useState(false);
    const [imageName, setImageName] = useState('');

    const [name, setName] = useState('');
    const [curWeather, setCurWeather] = useState(initCurWeather);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);

    async function getData() {
        const showLocation = async (position) => {
            const {latitude, longitude} = position.coords;
            setIsFetching(true);
            setErr(false);
            await fetch(`${baseUrl}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude},${longitude}`)
                .then(res => res.json())
                .then(async json => {
                    // let json = GEOPOSITION; //delete this! Only for testing
                    const locationKey = json.Key;
                    const name = json.EnglishName;
                    setName(name);

                    await fetch(`${baseUrl}/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`)
                        .then(res => res.json())
                        .then(json => {
                            // json = CUR_WEATHER; //delete this! Only for testing
                            json = convertKeys(json[0]);
                            const { weatherText,
                                weatherIcon,
                                isDayTime,
                                temperature,
                                realFeelTemperature,
                                visibility
                            } = json;

                            const speed = {
                                metric: {
                                    value: convertToMetersInSec(json.wind.Speed.Imperial.Value),
                                    unit: 'm/s'
                                },
                                imperial: {
                                    value: json.wind.Speed.Imperial.Value,
                                    unit: json.wind.Speed.Imperial.Unit
                                }
                            };
                            const wind = { speed, direction: json.wind.Direction.English };
                            setCurWeather({
                                weatherText,
                                weatherIcon,
                                isDayTime,
                                temperature,
                                realFeelTemperature,
                                wind,
                                visibility
                            });
                            const imageName = findImageName(weatherIcon);
                            setImageName(imageName);
                        }).catch(error => setErr(true));
                    await fetch(`${baseUrl}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}&details=true`)
                        .then(res => res.json())
                        .then(json => {
                            // json = HOURLY_FORECAST; //delete this! Only for testing
                            let hourlyForecast = [];
                            json.map(item => {
                                item = convertKeys(item);
                                const {
                                    weatherIcon,
                                    precipitationProbability,
                                    rainProbability,
                                    snowProbability,
                                    iceProbability
                                } = item;
                                const time = new Date(item.dateTime).getHours();
                                const metric = convertToCelsius(item.temperature.Value);
                                const imperial = item.temperature.Value;
                                const temperature = { metric, imperial }
                                hourlyForecast.push({
                                    time,
                                    weatherIcon,
                                    precipitationProbability,
                                    rainProbability,
                                    snowProbability,
                                    iceProbability,
                                    temperature
                                });
                                return hourlyForecast;
                            });
                            setHourlyForecast(hourlyForecast);
                        }).catch(error => setErr(true));
                    await fetch(`${baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&details=true`)
                        .then(res => res.json())
                        .then(json => {
                            // json = DAILY_FORECAST; //delete this! Only for testing
                            let dailyForecast = [];
                            json.DailyForecasts.map(item => {
                                const dayWeatherIcon = item.Day.Icon;
                                const date = item.Date;
                                const precipitationProbability = item.Day.PrecipitationProbability;
                                const rainProbability = item.Day.RainProbability;
                                const snowProbability = item.Day.SnowProbability;
                                const iceProbability = item.Day.IceProbability;
                                let metric = convertToCelsius(item.Temperature.Maximum.Value);
                                let imperial = item.Temperature.Maximum.Value;
                                const maxTemperature = { metric, imperial };
                                metric = convertToCelsius(item.Temperature.Minimum.Value);
                                imperial = item.Temperature.Minimum.Value;
                                const minTemperature = { metric, imperial };
                                dailyForecast.push({
                                    date,
                                    dayWeatherIcon,
                                    maxTemperature,
                                    minTemperature,
                                    precipitationProbability,
                                    rainProbability,
                                    snowProbability,
                                    iceProbability
                                });
                                return dailyForecast;
                            });
                            setDailyForecast(dailyForecast);
                        }).catch(error => setErr(true));
                }).catch(error => setErr(true))
                .finally(() => setIsFetching(false));
            // setIsFetching(false)//DELETE THIS
        };
        const errorHandler = (err) => {
            if (err.code === 1) {
                alert("Error: Access is denied!");
                setErr(true);
            };
            if (err.code === 2) {
                alert("Error: Position is unavailable!");
                setErr(true);
            };
        };
        navigator.geolocation ?
            navigator.geolocation.getCurrentPosition(showLocation, errorHandler)
            : alert("Sorry, browser does not support geolocation!");
    };

    useEffect(() => {
        let didCancel = false;
        getData().then(() => didCancel = true);
    }, []);

    const handleClick = (value) => {
        setIsMetricSys(value);
    };

    const backgroundUrl = findBackgroundUrl(imageName);

    const dayBackground = {
        backgroundImage: backgroundUrl
    };
    const nightBackground = {
        backgroundImage: `linear-gradient(black, black),${backgroundUrl}`,
        backgroundBlendMode: "saturation"
    };

    if (err) {
        return (
        <div className="error-image-overlay">
            <div className="error-image"></div>
            <h2 className="error-image-text">Oh no! We tripped up!</h2>
        </div>
    )};
    if (isFetching && !err) return <Spinner/>;

    return (
        <div className="App">
            <div className="background-image"
                 style={curWeather.isDayTime ? dayBackground : nightBackground}
            >
                <SetUnitButton isMetricsSys={isMetricSys} onHandleClick={handleClick}/>
                <CurrentWeather
                    isMetricSys={isMetricSys}
                    curWeather={curWeather}
                    name={name}
                    imageName={imageName}
                />
                <HourlyForecast
                    isMetricSys={isMetricSys}
                    hourlyForecast={hourlyForecast}
                    imageName={imageName}
                />
                <DailyForecast
                    isMetricSys={isMetricSys}
                    dailyForecast={dailyForecast}
                    imageName={imageName}
                />
            </div>
        </div>
    );
};

export default App;


