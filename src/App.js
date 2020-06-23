import React, {useState, useEffect, Suspense, useLayoutEffect} from 'react';
import {
    convertKeys,
    findImageName,
    convertToCelsius,
    convertToMetersInSec, findBackgroundUrl
} from './utils/utils';
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import Spinner from "./components/spinner/Spinner";
import SetUnitButton from "./components/set-unit-button/SetUnitButton";
import CurrentWeather from './components/current-weather/CurrentWeather';
import HourlyForecast from "./components/hourly-forecast/HourlyForecast";
import DailyForecast from "./components/daily-forecast/DailyForecast";
import './App.css';

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const App = () => {
    const [isMetricSys, setIsMetricSys] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [imageName, setImageName] = useState('');

    const initCurWeather = {
        weatherText: '',
        weatherIcon: null,
        isDayTime: true,
        temperature: {},
        realFeelTemperature: {},
        wind: { speed: {}, direction: ''},
        visibility: {}
    };
    const [name, setName] = useState('');
    const [curWeather, setCurWeather] = useState(initCurWeather);
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);

    useEffect(() => {
        let didCancel = false;

        const getData = async () => {
            const showLocation = (position) => {
                const {latitude, longitude} = position.coords;
                setIsFetching(true);
                fetch(`${baseUrl}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude},${longitude}`)
                    .then(res => res.json())
                    .then(json => {
                        const locationKey = json.Key;
                        const name = json.EnglishName;
                        setName(name);

                        setIsFetching(true);
                        fetch(`${baseUrl}/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`)
                            .then(res => res.json())
                            .then(json => {
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
                                setIsFetching(false);
                            });
                        setIsFetching(true);
                        fetch(`${baseUrl}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}`)
                            .then(res => res.json())
                            .then(json => {
                                let hourlyForecast = [];
                                json.map(item => {
                                    item = convertKeys(item);
                                    const {
                                        weatherIcon,
                                        hasPrecipitation,
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
                                        hasPrecipitation,
                                        precipitationProbability,
                                        rainProbability,
                                        snowProbability,
                                        iceProbability,
                                        temperature
                                    });
                                    return hourlyForecast;
                                });
                                setHourlyForecast(hourlyForecast);
                                setIsFetching(false);
                            });
                        setIsFetching(true);
                        fetch(`${baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&details=true`)
                            .then(res => res.json())
                            .then(json => {
                                let dailyForecast = [];
                                json.DailyForecasts.map(item => {
                                    const date = new Date(item.Date).getDate();
                                    const dayWeatherIcon = item.Day.Icon;
                                    const hasPrecipitation = item.HasPrecipitation;
                                    item = convertKeys(item);
                                    const { precipitationProbability,
                                        rainProbability,
                                        snowProbability,
                                        iceProbability } = item;
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
                                        hasPrecipitation,
                                        precipitationProbability,
                                        rainProbability,
                                        snowProbability,
                                        iceProbability
                                    });
                                    return dailyForecast;
                                });
                                setDailyForecast(dailyForecast);
                                setIsFetching(false);
                            })

                    }).catch(err => console.log(err.message));
            };
            const errorHandler = (err) => {
                if (err.code === 1) alert("Error: Access is denied!");
                if (err.code === 2) alert("Error: Position is unavailable!");
            };
            navigator.geolocation ?
                navigator.geolocation.getCurrentPosition(showLocation, errorHandler)
                : alert("Sorry, browser does not support geolocation!");
        };
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

    if (!isFetching) return <Spinner/>

    return (
        <div className="App">
            <ErrorBoundary>
                <div className="background-image"
                     style={isFetching ? null
                             : curWeather.isDayTime ?
                                 dayBackground
                             : nightBackground
                     }>
                    >
                    <SetUnitButton isMetricsSys={isMetricSys} onClick={handleClick}/>
                    <CurrentWeather
                        isFetching={!isFetching}
                        isMetricSys={isMetricSys}
                        curWeather={curWeather}
                        name={name}
                        imageName={imageName}
                        />
                    <HourlyForecast
                        isFetching={!isFetching}
                        isMetricSys={isMetricSys}
                        hourlyForecast={hourlyForecast}
                        imageName={imageName}
                    />
                    <DailyForecast
                        isFetching={isFetching}
                        isMetricSys={isMetricSys}
                        dailyForecast={dailyForecast}
                        imageName={imageName}
                    />
                </div>
            </ErrorBoundary>
        </div>
    );
}

export default App;
