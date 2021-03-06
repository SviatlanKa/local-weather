import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import './SetUnitButton.css';

const SetUnitButton = ({ isMetricsSys, onHandleClick }) => {
    const handleClick = () => {
        onHandleClick(!isMetricsSys);
    }
    return (
        <div className="set-units" onClick={handleClick}>
            <FontAwesomeIcon icon={faCog}/>
        </div>
    )
};

export default SetUnitButton;