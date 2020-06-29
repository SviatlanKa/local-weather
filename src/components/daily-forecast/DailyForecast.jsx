import React from "react";
import { changeBackgroundColor } from "../../utils/utils";
import WithSpinner from "../with-spinner/WithSpinner";
import DailyForecastItem from "../daily-forecast-item/DailyForecastItem";
import BarChart from "../charts/bar-chart/BarChart";
import './DailyForecast.css';

// const DailyForecast =({ imageName, isMetricSys, ...initData }) => {
//     const init = () => {// will delete
//         let one = {
//             date: 1,
//             dayWeatherIcon: 1,
//             maxTemperature: 68,
//             minTemperature: 50
//         }
//         const arrFor = [one];
//         for (let i = 1; i < 5; i++) {
//             let {
//                 date,
//                 dayWeatherIcon,
//                 maxTemperature,
//                 minTemperature
//             } = one;
//             date++;
//             dayWeatherIcon += 5;
//             maxTemperature--;
//             minTemperature--;
//             one = {
//                 date,
//                 dayWeatherIcon,
//                 maxTemperature,
//                 minTemperature
//             }
//             arrFor.push(one)
//         }
//         console.log(arrFor)
//         return arrFor;
//     }
//     const initState = init();
//     const [dailyForecast, setDailyForecast] = useState(initState);

const DailyForecast =({ isMetricSys, imageName, dailyForecast }) => (
    <div className={`daily-forecast${changeBackgroundColor(imageName) ? " grey" : ""}`}>
        <span className="daily-forecast-title">Daily Forecast</span>
        <div className="daily-forecast-columns">
            <div className="daily-forecast-cells">
                {
                    dailyForecast.map((dayForecast, index) => (
                         <DailyForecastItem key={index} isMetricSys={isMetricSys} {...dayForecast}/>
                    ))
                }
            </div>
            <BarChart isMetricSys={isMetricSys} data={dailyForecast}/>
        </div>
    </div>
);

export default WithSpinner(DailyForecast);
