import React, { useEffect, useRef, useState } from 'react';
import { changeBackgroundColor } from '../../utils/utils';
import HourlyForecastItem from "../hourly-forecast-item/HourlyForecastItem";
import AreaChart from "../charts/area-chart/AreaChart";
import './HourlyForecast.css';

const HourlyForecast= ({ isMetricSys, imageName, hourlyForecast }) => {
    const firstRowRef = useRef(null);
    const secondRowRef = useRef(null);

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const current = firstRowRef.current.style.visibility === "hidden" ?
            secondRowRef.current : firstRowRef.current;
        setWidth(current.offsetWidth);
        const heightSvg = current.offsetHeight * .54;
        console.log(heightSvg)
        setHeight(heightSvg);
        console.log(width, height)
    }, [height, width]);

    const handleClick = (e) => {
        const firstRow = firstRowRef.current.classList;
        const secondRow = secondRowRef.current.classList;
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
                    <div ref={firstRowRef} className="hourly-forecast-row">
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
                        <AreaChart data={hourlyForecast} isMetricSys={isMetricSys} width={width} height={height}/>
                    </div>
                    <div ref={secondRowRef} className="hourly-forecast-row hidden">
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
                        <AreaChart data={hourlyForecast} isMetricSys={isMetricSys} width={width} height={height} second/>
                    </div>
                </div>
                <div id="right-arrow" className="arrow" type="button" onClick={handleClick}>
                    &#10095;
                </div>
            </div>
        </div>
    )
};

export default HourlyForecast;