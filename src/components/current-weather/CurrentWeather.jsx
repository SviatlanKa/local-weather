import React from "react";
import { findImageName } from "./currentWeather.utils";
import './CurrentWeather.css';


const CurrentWeather = ({ curWeather }) => {
    const fileName = findImageName(curWeather.weatherIcon);
    console.log('fileName', fileName)
    console.log('curWeather', curWeather)
    return (
        <div className="background-image" style={{backgroundImage: `url('../../assets/${fileName}.jpg')`}}/>
    )
};

export default CurrentWeather;