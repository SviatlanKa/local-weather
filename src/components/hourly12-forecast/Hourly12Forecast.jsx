import React, { useState, useEffect } from 'react';
import WithSpinner from "../with-spinner/WithSpinner";
import { convertKeys } from "../../utils/utils";

//     fetch(`${baseUrl}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_Key}`)
//         .then(res => res.json())
//         .then(json => {
//             let hours12ForecastArray = [];
//             json.map(item => {
//                 item = convertKeys(item);
//                 const {
//                     weatherIcon,
//                     precipitationProbability
//                 } = item;
//                 const time = item.dateTime;
//                 const temperature = isMetricSys ? convertToCelsuis(item.temperature.Value)
//                     : item.temperature.Value;
//                 hours12ForecastArray.push({
//                     time,
//                     weatherIcon,
//                     temperature
//                 });
//                 return hours12ForecastArray;
//             });
//             this.setState({ hours12ForecastArray });
//         });

const Hourly12Forecast= ({ apiKey, baseUrl, isMetricSys, ...initData }) => {
    const initHourlyForecast = {
        weatherIcon: null,
        precipitationProbability: 0,
        time: '',
        temperature: 0
    };
    const { locationKey } = initData;
    const [hourlyForecast, setChourlyForecast] = useState(initHourlyForecast);
    const [isFetching, setIsFetching] = useState(true);

    return (
        <div className="hourly-12-forecast">
        </div>
    )
};

export default WithSpinner(Hourly12Forecast);