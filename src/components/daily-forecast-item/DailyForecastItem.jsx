import React from "react";
import WeatherIcon from "../weather-icon/WeatherIcon";
import PrecipitationIcon from "../precipitation-icon/PrecipitationIcon";

const DailyForecastItem = ({ isMetricSys,
                               date,
                               dayWeatherIcon,
                               maxTemperature,
                               minTemperature,
                               ...otherProps }) => {
    const weekDays = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Tuesday",
        5: "Friday",
        6: "Saturday"
    };
    const weekDay = new Date(date).getDay();
    const day = date.getDate();
    const month = date.getMonth();

    return (
        <div className="daily-forecast-item">
            <div>{weekDays[weekDay]}</div>
            <div>{day/month}</div>
            <WeatherIcon icon={dayWeatherIcon} smallSize />
            <PrecipitationIcon {...otherProps} />
            <div>{isMetricSys ? maxTemperature.metric : maxTemperature.imperial}°</div>
            <div>{isMetricSys ? minTemperature.metric : minTemperature.imperial}°</div>
        </div>
    )
};

export default DailyForecastItem;