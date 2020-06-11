import React, {Fragment} from "react";
import { changeBackgroundColor } from "../../utils/utils";
import WeatherIcon from "../weather-icon/WeatherIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTint, faTintSlash } from "@fortawesome/free-solid-svg-icons";
import './HourlyForecastItem.css';

const HourlyForecastItem = ({ isMetricSys, imageName, time, weatherIcon, temperature, hasPrecipitation, precipitationProbability }) => (
    <div className="hourly-forecast-item">
        <div>{time}:00</div>
        <WeatherIcon icon={weatherIcon} smallSize/>
        <div className={`precipitation${changeBackgroundColor(imageName) ? " precipitation-grey" : ""}`}>
            {
                hasPrecipitation ?
                    <Fragment>
                        <div className="precipitation-icon">
                            <FontAwesomeIcon icon={faTint}/>
                        </div>
                        <span className="precipitation-probability">{precipitationProbability}%</span>
                    </Fragment>
                    :
                    <div className="precipitation-icon">
                        <FontAwesomeIcon icon={faTintSlash}/>
                    </div>
            }
        </div>
        <div>{isMetricSys ? temperature.metric: temperature.imperial}°</div>
    </div>
);

export default HourlyForecastItem;