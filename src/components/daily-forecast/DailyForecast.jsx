import React, {useState, useEffect, Fragment} from "react";
import { convertToCelsuis } from "../../utils/utils";
import WeatherIcon from "../weather-icon/WeatherIcon";
import WithSpinner from "../with-spinner/WithSpinner";
import './DailyForecast.css';
import DailyForecastItem from "../daily-forecast-item/DailyForecastItem";

const DailyForecast =({ apiKey, baseUrl, isMetricSys, ...initData }) => {
    //const [dailyForecast, setDailyForecast] = useState([]);
    const init = () => {// will delete
        let one = {
            date: 1,
            dayWeatherIcon: 1,
            maxTemperature: 68,
            minTemperature: 50
        }
        const arrFor = [one];
        for(let i = 1; i < 5; i++) {
            let { date,
                dayWeatherIcon,
                maxTemperature,
                minTemperature } = one;
            date++;
            dayWeatherIcon += 5;
            maxTemperature--;
            minTemperature--;
            one = { date,
                dayWeatherIcon,
                maxTemperature,
                minTemperature }
            arrFor.push(one)
        }
        console.log(arrFor)
        return arrFor;
    }
    const initState = init();
    const [dailyForecast, setDailyForecast] = useState(initState);
    const [isFetching, setIsFetching] = useState(true);
    const { locationKey } = initData;

    // useEffect(() => {
    //     let didCancel = false;
    //     if (didCancel) { //temp block for stopping fetching from API
    //         const getDailyForecast = async () => {
    //             fetch(`${baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`)
    //                 .then(res => res.json())
    //                 .then(json => {
    //                     let dailyForecast = [];
    //                     json.DailyForecasts.map(item => {
    //                         const date = new Date(item.Date).getDate();
    //                         const dayWeatherIcon = item.Day.Icon;
    //                         const maxTemperature = isMetricSys ? convertToCelsuis(item.Temperature.Maximum.Value)
    //                             : item.Temperature.Maximum.Value;
    //                         const minTemperature = isMetricSys ? convertToCelsuis(item.Temperature.Minimum.Value)
    //                             : item.Temperature.Minimum.Value;
    //                         dailyForecast.push({
    //                             date,
    //                             dayWeatherIcon,
    //                             maxTemperature,
    //                             minTemperature
    //                         });
    //                         return dailyForecast;
    //                     });
    //                     setDailyForecast(dailyForecast);
    //                     setIsFetching(false);
    //                 })
    //                 .catch(error => console.log(error.message));
    //         }
    //         getDailyForecast().then(() => didCancel = true);
    //     }
    // }, [apiKey, baseUrl, isMetricSys, locationKey]);

    return (
        <div className="daily-forecast">
            <span className="daily-forecast-title">Daily Forecast</span>
            <div className="daily-forecast-rows">
                {
                    dailyForecast.map((dayForecast, index) => (
                            <DailyForecastItem key={index} {...dayForecast}/>
                        )

                    )
                }
            </div>

        </div>
    )
};

export default WithSpinner(DailyForecast);
