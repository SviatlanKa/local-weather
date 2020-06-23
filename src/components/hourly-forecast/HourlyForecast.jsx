import React from 'react';
import { changeBackgroundColor } from '../../utils/utils';
import WithSpinner from "../with-spinner/WithSpinner";
import HourlyForecastItem from "../hourly-forecast-item/HourlyForecastItem";
import AreaChart from "../charts/area-chart/AreaChart";
import './HourlyForecast.css';

const HourlyForecast= ({ isMetricSys, imageName, hourlyForecast }) => {
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
    };

    const firstGroupData = hourlyForecast.slice(0, 6);
    const secondGroupData = hourlyForecast.slice(6);

    return (
        <div className={`hourly-forecast${changeBackgroundColor(imageName) ? " grey" : ""}`}>
            <span className="hourly-forecast-title">Hourly Forecast</span>
            <div className="hourly-forecast-panel">
                <div id="left-arrow" className="arrow" type="button" onClick={handleClick}>
                    &#10094;
                </div>
                <div className="hourly-forecast-rows">
                    <div id="first-row" className="hourly-forecast-row">
                        <div className="hourly-forecast-cells">
                            {
                                firstGroupData.map((hourForecast, index) => (
                                    <HourlyForecastItem
                                        key={index}
                                        imageName={imageName}
                                        { ...hourForecast }/>
                                ))
                            }
                        </div>
                        <AreaChart data={hourlyForecast} isMetricsSys={isMetricSys}/>
                    </div>
                    <div id="second-row" className="hourly-forecast-row hidden">
                        <div className="hourly-forecast-cells">
                            {
                                secondGroupData.map((hourForecast, index) => (
                                    <HourlyForecastItem
                                        key={index + 6}
                                        imageName={imageName}
                                        { ...hourForecast }
                                    />
                                ))
                            }
                        </div>
                        <AreaChart data={hourlyForecast} isMetricsSys={isMetricSys} second/>
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