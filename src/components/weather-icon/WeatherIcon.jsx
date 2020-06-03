import React from 'react';
import './WeatherIcon.css';

const WeatherIcon = ({ icon, bigSize, smallSize }) => (
    <div className="weather-icon">
        <img
            className={`weather-icon-img ${bigSize ? "bigSize" : ""} ${smallSize ? "smallSize" : ""}`}
            src={
                icon < 10
                    ? `https://developer.accuweather.com/sites/default/files/0${icon}-s.png`
                    : `https://developer.accuweather.com/sites/default/files/${icon}-s.png`}
            alt="weather icon" />
    </div>
);

export default WeatherIcon;