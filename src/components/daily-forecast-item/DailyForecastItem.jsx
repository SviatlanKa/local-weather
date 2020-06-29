import React from "react";
import WeatherIcon from "../weather-icon/WeatherIcon";
import PrecipitationIcon from "../precipitation-icon/PrecipitationIcon";

const DailyForecastItem = ({ isMetricSys,
                               date,
                               dayWeatherIcon,
                               ...otherProps }) => {
    const weekDays = {
        0: "Sun",
        1: "Mon",
        2: "Tue",
        3: "Wed",
        4: "Thu",
        5: "Fri",
        6: "Sat"
    };
    const weekDay = new Date(date).getDay();
    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;

    return (
        <div className="daily-forecast-item">
            <div>{weekDays[weekDay]}</div>
            <div>{day}/{month}</div>
            <WeatherIcon icon={dayWeatherIcon} smallSize />
            <PrecipitationIcon {...otherProps} />
        </div>
    )
};

export default DailyForecastItem;