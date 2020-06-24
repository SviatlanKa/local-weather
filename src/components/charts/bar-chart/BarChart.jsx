import React, {useEffect, useLayoutEffect} from 'react';
import * as d3 from 'd3';

const BarChart = ({ isMetricSys, data }) => {

    // let dataset = data.map(item =>  {
    //         const minTemp = isMetricSys ? item.minTemperature.metric : item.minTemperature.imperial;
    //         const maxTemp = isMetricSys ? item.maxTemperature.metric : item.maxTemperature.imperial;
    //         return { minTemp, maxTemp };
    // });

    useLayoutEffect(() => {
        if (data.length > 0) {
            let dataset = isMetricSys ? [{maxTemp: [25,26,29,22,23]}, //DELETE THIS
                {minTemp: [12,15,16,10,9]}] : [{maxTemp: [89,85,84,88,78]},
                {minTemp: [56,53,50,49,52]}]

            const minVal = d3.min(dataset.map(item => item.minTemp));
            const maxVal = d3.max(dataset.map(item => item.maxTemp));

            const svgBBox = document.getElementById("daily-forecast-rows")//.getBoundingClientRect();
            console.log(svgBBox)
            // const width = svgBBox.width;
            // const height = svgBBox.height;
            // console.log(width,height)
            // const margin = 4;
            //
            // const horizPadding = width / (dataset.length);
            // const rectWidth = horizPadding / 4;
            //
            const svg = d3.select("bar-chart");
            // svg.selectAll('*').remove();
            //
            // const scaleX = d3.scaleLinear()
            //     .domain([0, dataset.length])
            //     .range([0, width - margin * 2]);
            // const scaleY = d3.scaleLinear()
            //     .domain([minVal - 1, maxVal])
            //     .range([height, 25]);

            const scaleX = d3.scaleLinear()
                .domain([0, dataset.length])
                .range([0, 500]);
            const scaleY = d3.scaleLinear()
                .domain([minVal - 1, maxVal])
                .range([100, 25]);

            svg.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr("class", "bar")
                .attr("x", (d, i) => scaleX(i))
                .attr("y", d => scaleY(d))
                .attr("width", 500 / dataset.length)
                .attr("height", d => 100 - scaleY(d));
            //
            // const charPlot = svg.append('g')
            //     .attr("transform", `translate(${horizPadding / 2 + margin},0)`);
            //
            // svg.selectAll('rect')
            //     .data(dataset)
            //     .enter()
            //     .append('rect')
            //     .attr("class", "bar")
            //     .attr("x", (d, i) => scaleX(i))
            //     .attr("y", d => scaleY(d))
            //     .attr("width", width / dataset.length)
            //     .attr("height", d => height - scaleY(d));
        }
    }, [isMetricSys]);

    if (data.length === 0) return null;
    return (
        <svg id="bar-chart" width="100%" height="100%"></svg>
    )
}

export default BarChart;