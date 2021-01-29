import React, {useEffect, useRef, useState} from "react";
import { changeBackgroundColor } from "../../utils/utils";
import DailyForecastItem from "../daily-forecast-item/DailyForecastItem";
import BarChart from "../charts/bar-chart/BarChart";
import './DailyForecast.css';

const DailyForecast =({ isMetricSys, imageName, dailyForecast }) => {
    const columnsRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            const widthSvg = columnsRef.current.offsetWidth;
            const heightSvg = columnsRef.current.offsetHeight * .54;
            setWidth(widthSvg);
            setHeight(heightSvg);
        }, 500);
    }, [width, height]);

    if (dailyForecast.length === 0) return null;
    return (
        <div className={`daily-forecast${changeBackgroundColor(imageName) ? " grey" : ""}`}>
            <span className="daily-forecast-title">Daily Forecast</span>
            <div ref={columnsRef} className="daily-forecast-columns">
                <div className="daily-forecast-cells">
                    {
                        dailyForecast.map((dayForecast, index) => (
                            <DailyForecastItem key={index} isMetricSys={isMetricSys} {...dayForecast}/>
                        ))
                    }
                </div>
                <BarChart isMetricSys={isMetricSys} data={dailyForecast} width={width} height={height}/>
            </div>
        </div>
);}

export default DailyForecast;
