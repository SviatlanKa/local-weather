import React from "react";
import { changeBackgroundColor } from "../../utils/utils";
import DailyForecastItem from "../daily-forecast-item/DailyForecastItem";
import BarChart from "../charts/bar-chart/BarChart";
import './DailyForecast.css';
import ErrorBoundary from "../error-boundary/ErrorBoundary";

const DailyForecast =({ isMetricSys, imageName, dailyForecast }) => (
    <ErrorBoundary>
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
    </ErrorBoundary>
);

export default DailyForecast;
