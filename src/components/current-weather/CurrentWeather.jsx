import React from "react";
import { findImageName } from "./currentWeather.utils";
import sun from '../../assets/sun.jpg';
import clouds from '../../assets/clouds.jpg';
import fog from '../../assets/fog.jpg';
import rain from '../../assets/rain.jpg';
import lightning from '../../assets/lightning.jpg';
import wind from '../../assets/wind.jpg';
import snow from '../../assets/snow.jpg';
import moon from '../../assets/moon.jpg';
import './CurrentWeather.css';

const findBackgroundUrl = (imgName) => {
    let url = null;
    switch (imgName) {
        case "sun":
            url = `url('${sun}')`;
            break;
        case "clouds":
            url = `url('${clouds}')`;
            break;
        case "fog":
            url = `url('${fog}')`;
            break;
        case "rain":
            url = `url('${rain}')`;
            break;
        case "lightning":
            url = `url('${lightning}')`;
            break;
        case "wind":
            url = `url('${wind}')`;
            break;
        case "snow":
            url = `url('${snow}')`;
            break;
        case "moon":
            url = `url('${moon}')`;
            break;
        default:
            break;
    }
    return url;
};

const CurrentWeather = ({ curWeather, name }) => {
    const {
        temperature,
        isDayTime,
        weatherIcon,
        weatherText,
        realFeelTemperature,
        wind,
        visibility } = curWeather;

    let imageName = "";

    if (weatherIcon) {
        imageName = findImageName(weatherIcon);
    } else imageName = isDayTime ? "sun" : "moon";

    const backgroundUrl = findBackgroundUrl(imageName);

    return (
        <div
            className="background-image"
            style={{backgroundImage: backgroundUrl}}
        >
            <h1>{name}</h1>
            <div>
                <p className="current-temperature">{temperature}</p>
                <p className="text-weather">{weatherText}</p>
                <p className="real-feel-temperature">RealFeel {realFeelTemperature}</p>
            </div>
            <div>
                <img
                    className="weather-icon"
                    src={
                        curWeather.weatherIcon < 10
                            ? `https://developer.accuweather.com/sites/default/files/0${weatherIcon}-s.png`
                            : `https://developer.accuweather.com/sites/default/files/${weatherIcon}-s.png`}
                    alt="weather icon" />
                <p className="wind">{wind.Value} {wind.Unit} {wind.directon}</p>
                <p>Visibility {visibility.Value} {visibility.Unit}</p>
            </div>

        </div>
    )
};

export default CurrentWeather;