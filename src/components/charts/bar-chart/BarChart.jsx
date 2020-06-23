import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ isMetricSys, data }) => {

    let dataset = data.map(item =>  {
            const minTemp = isMetricSys ? item.minTemperature.metric : item.minTemperature.imperial;
            const maxTemp = isMetricSys ? item.maxTemperature.metric : item.mmaxTemperature.imperial;
            return { minTemp, maxTemp };
    });
    const minVal = d3.min(dataset.map(item => item.minTemp));
    const maxVal = d3.max(dataset.map(item => item.maxTemp));

    if (data.length === 0) return null;
    return (
        <svg id="bar-chart" width="100%" height="100%"></svg>
    )
}

export default BarChart;