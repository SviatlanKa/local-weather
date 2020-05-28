import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WithSpinner from "../with-spinner/WithSpinner";
import WeatherIcon from "../weather-icon/WeatherIcon";
import { faTint, faTintSlash } from "@fortawesome/free-solid-svg-icons";
import { convertKeys, convertToCelsuis } from "../../utils/utils";
import './HourlyForecast.css'

const HourlyForecast= ({ apiKey, baseUrl, isMetricSys, ...initData }) => {
    const { locationKey } = initData;
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        let didCancel = false;
        setIsFetching(true);
        const getHourlyForecast = async () => {
            fetch(`${baseUrl}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}`)
                .then(res => res.json())
                .then(json => {
                    let hourlyForecast = [];
                    json.map(item => {
                        item = convertKeys(item);
                        const {
                            weatherIcon,
                            precipitationProbability
                        } = item;
                        const time = new Date(item.dateTime).getHours();
                        const temperature = isMetricSys ? convertToCelsuis(item.temperature.Value)
                            : item.temperature.Value;
                        hourlyForecast.push({
                            time,
                            weatherIcon,
                            precipitationProbability,
                            temperature
                        });
                        return hourlyForecast;
                    });
                    setHourlyForecast(hourlyForecast);
                    setIsFetching(false);
                });
        }
        getHourlyForecast().then(() => didCancel = true);
    }, [apiKey, baseUrl, isMetricSys, locationKey]);

    console.log(hourlyForecast);

    return (
        <div className="hourly-forecast">
            {
                hourlyForecast.map(hourForecast => (
                    <Fragment>
                        <div>{hourForecast.time}</div>
                        <WeatherIcon icon={hourForecast.weatherIcon}/>
                        <div className="precipitation-group"><FontAwesomeIcon icon={faTint}/><span className="precipitation">{hourForecast.precipitationProbability}</span></div>
                        <div>{hourForecast.temperature}°</div>
                    </Fragment>
                    )
                )
            }


        </div>
    )
};

export default WithSpinner(HourlyForecast);