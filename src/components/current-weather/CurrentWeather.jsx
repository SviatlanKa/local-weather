import React, { useState, useEffect } from "react";
import {findImageName, convertKeys, findBackgroundUrl} from "../../utils/utils";
import WithSpinner from '../with-spinner/WithSpinner';
import WeatherIcon from '../weather-icon/WeatherIcon';
import './CurrentWeather.css';

const CurrentWeather = ({ apiKey, baseUrl, isMetricSys, ...initData }) => {
    // const initCurWeather = {
    //     weatherText: '',
    //     weatherIcon: null,
    //     isDayTime: true,
    //     temperature: {},
    //     realFeelTemperature: {},
    //     wind: { speed: {}, direction: ''},
    //     visibility: {}
    // };

    const initCurWeather = {
        weatherText: 'Sunny',
        weatherIcon: 12,
        isDayTime: true,
        temperature: {
            Value: 55,
            Unit: 'F'
        },
        realFeelTemperature: {
            Value: 58,
            Unit: 'F'
        },
        wind: { speed: {
                Value: 55,
                Unit: 'mi'
            },
            direction: 'EEN'},
        visibility: {
            Value: 100,
            Unit: 'km'
        }
    };

    const { locationKey } = initData;
    const [curWeather, setCurWeather] = useState(initCurWeather);
    const [isFetching, setIsFetching] = useState(false); //will change to true

    // useEffect(() => {
    //     let didCancel = false;
    //     if (didCancel) { //temp block for stopping fetching from API
    //         setIsFetching(true);
    //         const getCurWeather = async () => {
    //             fetch(`${baseUrl}/currentconditions/v1/${locationKey}?apikey=${apiKey}&details=true`)
    //                 .then(res => res.json())
    //                 .then(json => {
    //                     json = convertKeys(json[0]);
    //                     const {
    //                         weatherText,
    //                         weatherIcon,
    //                         isDayTime
    //                     } = json;
    //                     const temperature = isMetricSys ? json.temperature.Metric
    //                         : json.temperature.Imperial;
    //                     const realFeelTemperature = isMetricSys ? json.realFeelTemperature.Metric
    //                         : json.realFeelTemperature.Imperial;
    //                     const speed = isMetricSys ? json.wind.Speed.Metric : json.wind.Speed.Imperial;
    //                     const wind = { speed, direction: json.wind.Direction.English };
    //                     const visibility = isMetricSys ? json.visibility.Metric : json.visibility.Imperial;
    //                     setCurWeather({
    //                         weatherText,
    //                         weatherIcon,
    //                         isDayTime,
    //                         temperature,
    //                         realFeelTemperature,
    //                         wind,
    //                         visibility
    //                     });
    //                     setIsFetching(false);
    //                 })
    //                 .catch(error => console.log(error.message));
    //         }
    //         getCurWeather().then(() => didCancel = true);
    //     }
    // }, [apiKey, baseUrl, isMetricSys, locationKey]);

    const {
        weatherText,
        weatherIcon,
        isDayTime,
        temperature,
        realFeelTemperature,
        wind,
        visibility
    } = curWeather;

    // if (!isFetching) {
    //     const imageName = findImageName(curWeather.weatherIcon);
    //     const imageUrl = findBackgroundUrl(imageName);
    //     const backgroundImg = document.getElementsByClassName('background-image')[0].style;
        // if (imageName === "fog" || imageName === "wind") {
        //     document.getElementsByClassName('hourly-forecast').classList.toggle('grey');
        //     document.getElementsByClassName('precipitation').classList.toggle('grey');
        //     document.getElementsByClassName('daily-forecast').classList.toggle('grey');
        // }
    //
    //     if (!isDayTime) {
    //         backgroundImg.backgroundImage = `linear-gradient(black, black), ${imageUrl}`;
    //         backgroundImg.backgroundBlendMode = "saturation";
    //     } else backgroundImg.backgroundImage = imageUrl;
    // }

    return (
        <div className="current-weather">
            <span className="city-name">{initData.name}</span>
            <div className="current-weather-rows">
                <span className="current-temperature">{temperature.Value}°{temperature.Unit}</span>
                <WeatherIcon icon={weatherIcon} bigSize/>
                <span className="left first">{weatherText}</span>
                <span className="right first">{wind.speed.Value} {wind.speed.Unit} {wind.direction}</span>
                <span className="left">RealFeel {realFeelTemperature.Value}°{realFeelTemperature.Unit}</span>
                <span className="right">Visibility {visibility.Value} {visibility.Unit}</span>
            </div>
        </div>
    )
};

export default WithSpinner(CurrentWeather);