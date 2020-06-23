import React from "react";
import WeatherIcon from '../weather-icon/WeatherIcon';
import WithSpinner from "../with-spinner/WithSpinner";
import './CurrentWeather.css';


const CurrentWeather = ({ name, isMetricSys, curWeather }) => {
    const { weatherText, weatherIcon, isDayTime, wind } = curWeather;
    const temperature = isMetricSys ? curWeather.temperature.Metric : curWeather.temperature.Imperial;
    const realFeelTemperature = isMetricSys ? curWeather.realFeelTemperature.Metric : curWeather.realFeelTemperature.Imperial;
    const speed = isMetricSys ? wind.speed.metric : wind.speed.imperial;
    const visibility = isMetricSys ? curWeather.visibility.Metric : curWeather.visibility.Imperial;

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
    return (
        <div className="current-weather">
            <span className="city-name">{name}</span>
            <div className="current-weather-rows">
                <span className="current-temperature">{initCurWeather.temperature.Value}°{initCurWeather.temperature.Unit}</span>
                <WeatherIcon icon={weatherIcon} bigSize/>
                <span className="left first">{initCurWeather.weatherText}</span>
                {/*<span className="right first">{initCurWeather.speed.Value} {initCurWeather.speed.Unit} {initCurWeather.wind.direction}</span>*/}
                <span className="left">RealFeel {initCurWeather.realFeelTemperature.Value}°{initCurWeather.realFeelTemperature.Unit}</span>
                <span className="right">Visibility {initCurWeather.visibility.Value} {initCurWeather.visibility.Unit}</span>
            </div>
        </div>
    )

    // return (
    //     <div className="current-weather">
    //         <span className="city-name">{name}</span>
    //         <div className="current-weather-rows">
    //             <span className="current-temperature">{temperature.Value}°{temperature.Unit}</span>
    //             <WeatherIcon icon={weatherIcon} bigSize/>
    //             <span className="left first">{weatherText}</span>
    //             <span className="right first">{speed.value} {speed.unit} {wind.direction}</span>
    //             <span className="left">RealFeel {realFeelTemperature.Value}°{realFeelTemperature.Unit}</span>
    //             <span className="right">Visibility {visibility.Value} {visibility.Unit}</span>
    //         </div>
    //     </div>
    // )
};

export default WithSpinner(CurrentWeather);