import React, {useState, useEffect, Fragment} from "react";
import { convertToCelsuis } from "../../utils/utils";
import WeatherIcon from "../weather-icon/WeatherIcon";
import WithSpinner from "../with-spinner/WithSpinner";
import './DailyForecast.css';

const DailyForecast =({ apiKey, baseUrl, isMetricSys, ...initData }) => {
    const [dailyForecast, setDailyForecast] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const { locationKey } = initData;

    useEffect(() => {
        let didCancel = false;
        const getDailyForecast = async () => {
            fetch(`${baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`)
                .then(res => res.json())
                .then(json => {
                    let dailyForecast = [];
                    json.DailyForecasts.map(item => {
                        const date = new Date(item.Date).getDate();
                        const dayWeatherIcon = item.Day.Icon;
                        const maxTemperature = isMetricSys ? convertToCelsuis(item.Temperature.Maximum.Value)
                            : item.Temperature.Maximum.Value;
                        const minTemperature = isMetricSys ? convertToCelsuis(item.Temperature.Minimum.Value)
                            : item.Temperature.Minimum.Value;
                        dailyForecast.push({
                            date,
                            dayWeatherIcon,
                            maxTemperature,
                            minTemperature
                        });
                        return dailyForecast;
                    });
                    setDailyForecast(dailyForecast);
                    setIsFetching(false);
                });
            }
            getDailyForecast().then(() => didCancel = true);
    }, [apiKey, baseUrl, isMetricSys, locationKey]);

    console.log(dailyForecast);

    return (
        <div className="daily-forecast">
            {
                dailyForecast.map(dayForecast => (
                        <Fragment>
                            <div>{dayForecast.time}</div>
                            <WeatherIcon icon={dayForecast.dayWeatherIcon}/>
                            <div>{dayForecast.maxTemperature}°</div>
                            <div>{dayForecast.minTemperature}°</div>
                        </Fragment>
                    )

                )
            }
        </div>
    )
}

export default WithSpinner(DailyForecast);
