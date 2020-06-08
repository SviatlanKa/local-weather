import React, { useState, useEffect, Fragment } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WithSpinner from "../with-spinner/WithSpinner";
import WeatherIcon from "../weather-icon/WeatherIcon";
import { faTint, faTintSlash } from "@fortawesome/free-solid-svg-icons";
import { convertKeys, convertToCelsuis } from "../../utils/utils";
import './HourlyForecast.css'
import HourlyForecastItem from "../hourly-forecast-item/HourlyForecastItem";

const HourlyForecast= ({ apiKey, baseUrl, isMetricSys, ...initData }) => {
    const { locationKey } = initData;
    //const [hourlyForecast, setHourlyForecast] = useState([]);
    const init = () => {// will delete
        let one = {
        time: 12,
        weatherIcon: 2,
        hasPrecipitation: false,
        precipitationProbability: 5,
        temperature: 55
        }
        const arrFor = [one];
        for(let i = 1; i < 12; i++) {
            let { time,
                weatherIcon,
                hasPrecipitation,
                precipitationProbability,
                temperature } = one;
            time++;
            weatherIcon += 3;
            hasPrecipitation = !hasPrecipitation;
            temperature++;
            one = {time,
                weatherIcon,
                hasPrecipitation,
                precipitationProbability,
                temperature}
            arrFor.push(one)
        }
        console.log(arrFor)
        return arrFor;
    }
    const initState = init();

    const [hourlyForecast, setHourlyForecast] = useState(initState);

    const [isFetching, setIsFetching] = useState(true);

    // useEffect(() => {
    //     let didCancel = false;
    //     if (didCancel) { //temp block for stopping fetching from API
    //         setIsFetching(true);
    //         const getHourlyForecast = async () => {
    //             fetch(`${baseUrl}/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}`)
    //                 .then(res => res.json())
    //                 .then(json => {
    //                     let hourlyForecast = [];
    //                     json.map(item => {
    //                         item = convertKeys(item);
    //                         const {
    //                             weatherIcon,
    //                             hasPrecipitation,
    //                             precipitationProbability
    //                         } = item;
    //                         const time = new Date(item.dateTime).getHours();
    //                         const temperature = isMetricSys ? convertToCelsuis(item.temperature.Value)
    //                             : item.temperature.Value;
    //                         hourlyForecast.push({
    //                             time,
    //                             weatherIcon,
    //                             hasPrecipitation,
    //                             precipitationProbability,
    //                             temperature
    //                         });
    //                         return hourlyForecast;
    //                     });
    //                     setHourlyForecast(hourlyForecast);
    //                     setIsFetching(false);
    //                 })
    //                 .catch(error => console.log(error.message));
    //         }
    //         getHourlyForecast().then(() => didCancel = true);
    //     }
    // }, [apiKey, baseUrl, isMetricSys, locationKey]);

    const handleClick = (e) => {
        const firstRow = document.getElementById("first-row").classList;
        const secondRow = document.getElementById("second-row").classList;
        const leftArrow = document.getElementById("left-arrow");
        const rightArrow = document.getElementById("right-arrow");
        if (e.target.id === "right-arrow") {
           firstRow.toggle("hidden");
           secondRow.toggle("hidden");
           rightArrow.style.visibility = "hidden";
           leftArrow.style.visibility = "visible";
        } else {
            secondRow.toggle("hidden");
            firstRow.toggle("hidden");
            leftArrow.style.visibility = "hidden";
            rightArrow.style.visibility = "visible";
        }
    }

    const firstGroupData = hourlyForecast.slice(0, 6);
    const secondGroupData = hourlyForecast.slice(6);

    return (
        <div className="hourly-forecast">
            <span className="hourly-forecast-title">Hourly Forecast</span>
            <div className="hourly-forecast-panel">
                <div id="left-arrow" className="arrow" type="button" onClick={handleClick}>
                    &#10094;
                </div>
                <div className="hourly-forecast-rows">
                    <div id="first-row" className="hourly-forecast-row">
                        {
                            firstGroupData.map((data, index) => (
                                <HourlyForecastItem key={index} { ...data }/>
                            ))
                        }
                    </div>
                    <div id="second-row" className="hourly-forecast-row hidden">
                        {
                            secondGroupData.map((data, index) => (
                                <HourlyForecastItem key={index + 6} { ...data }/>
                            ))
                        }
                    </div>
                </div>
                <div id="right-arrow" className="arrow" type="button" onClick={handleClick}>
                    &#10095;
                </div>
            </div>
        </div>
    )
};

export default WithSpinner(HourlyForecast);