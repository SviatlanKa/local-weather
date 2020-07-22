import React, { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ isMetricSys, data, width, height }) => {
    const barChartRef = useRef(null);

    useLayoutEffect(() => {
        if (data.length > 0 && width > 0) {
            let dataset = data.map(item =>  {
                const minTemp = isMetricSys ? item.minTemperature.metric : item.minTemperature.imperial;
                const maxTemp = isMetricSys ? item.maxTemperature.metric : item.maxTemperature.imperial;
                return { minTemp, maxTemp };
            });

            const minVal = d3.min(dataset.map(item => item.minTemp));
            const maxVal = d3.max(dataset.map(item => item.maxTemp));
            const margin = 4;

            const cellWidth = width / dataset.length;
            const rectWidth = cellWidth / 7;

            const svg = d3.select(barChartRef.current);
            svg.selectAll('*').remove();

            const defs = svg.append("defs");

            const gradient = defs.append("linearGradient")
                .attr("id", "svgGradient")
                .attr("x1", "0%")
                .attr("x2", "0%")
                .attr("y1", "0%")
                .attr("y2", "100%");

            gradient.append("stop")
                .attr('class', 'start')
                .attr("offset", "0%")
                .attr("stop-color", "#e66312")
                .attr("stop-opacity", 1);

            gradient.append("stop")
                .attr('class', 'end')
                .attr("offset", "100%")
                .attr("stop-color", "#00cf3b")
                .attr("stop-opacity", 1);

            const scaleX = d3.scaleLinear()
                .domain([0, dataset.length])
                .range([0, width]);
            const scaleY = d3.scaleLinear()
                .domain([minVal - 1, maxVal])
                .range([height - 25, 25]);

            const charPlot = svg.append('g')
                .attr("transform", `translate(${cellWidth / 2 - rectWidth / 2},0)`);

            charPlot.selectAll('rect')
                .data(dataset)
                .enter()
                .append('rect')
                .attr("class", "bar")
                .attr("x", (d, i) => scaleX(i))
                .attr("rx", 5)
                .attr("y", d => scaleY(d.maxTemp))
                .attr("width", cellWidth / 7)
                .attr("height", d => scaleY(d.minTemp) - scaleY(d.maxTemp))
                .style("fill", "url(#svgGradient)");

            const texts = charPlot.selectAll("text")
                .data(dataset)
                .enter();

            texts.append("text")
                .attr("class", "text")
                .attr("text-anchor", "middle")
                .attr("x", (d, i) => scaleX(i) + rectWidth / 1.5)
                .attr("y", d => scaleY(d.minTemp) + margin * 5)
                .text(d => d.minTemp + "\u{BA}");

            texts.append("text")
                .attr("class", "text")
                .attr("text-anchor", "middle")
                .attr("x", (d, i) => scaleX(i) + rectWidth / 1.5)
                .attr("y", d => scaleY(d.maxTemp) - margin * 2)
                .text(d => d.maxTemp + "\u{BA}");
        }
    });

    if (data.length === 0 || width === 0) return null;
    return (
        <svg ref={barChartRef} width={width} height={height}></svg>
    )
};

export default BarChart;