import React from "react";
import { changeBackgroundColor } from "../../utils/utils";
import WithSpinner from "../with-spinner/WithSpinner";
import DailyForecastItem from "../daily-forecast-item/DailyForecastItem";
import BarChart from "../charts/bar-chart/BarChart";
import './DailyForecast.css';

const DailyForecast =({ isMetricSys, imageName, dailyForecast }) => (
    <div className={`daily-forecast${changeBackgroundColor(imageName) ? " grey" : ""}`}>
        <span className="daily-forecast-title">Daily Forecast</span>
        <div className="daily-forecast-rows">
            {
                dailyForecast.map((dayForecast, index) => (
                    <DailyForecastItem key={index} isMetricSys={isMetricSys} {...dayForecast}/>
                ))
            }
        </div>
        <BarChart data={dailyForecast} />
    </div>
);

export default WithSpinner(DailyForecast);
