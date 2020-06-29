import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTint, faTintSlash } from "@fortawesome/free-solid-svg-icons";
import  { faSnowflake} from "@fortawesome/free-regular-svg-icons";
import { changeBackgroundColor } from "../../utils/utils";
import './PrecipitationIcon.css';

const PrecipitationIcon = ({imageName,
                               precipitationProbability,
                               rainProbability,
                               snowProbability,
                               iceProbability,
                           noBackground}) => {
    return (
    <div className={`precipitation${changeBackgroundColor(imageName) ? " precipitation-grey" : ""}
    ${noBackground ? "no-background" : ""}`}>
        {
            precipitationProbability > 0 ?
                <>
                    <div className="precipitation-icon">
                        <FontAwesomeIcon icon={(snowProbability + iceProbability > rainProbability) ?
                            faSnowflake : faTint}
                        />
                    </div>
                    <span className="precipitation-probability">{precipitationProbability}%</span>
                </>
                :
                <div className="precipitation-icon">
                    <FontAwesomeIcon icon={faTintSlash}/>
                </div>
        }
    </div>
);}

export default PrecipitationIcon;