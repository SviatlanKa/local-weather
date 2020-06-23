import * as d3 from 'd3';
import React, { useEffect } from "react";
import './AreaChart.css';

const AreaChart = ({ data, isMetricSys, second }) => {
    const svgId = second ? "area-chart-second" : "area-chart-first";

    useEffect(() => {
        if (data.length > 0) {
            // let dataset = data.map(item =>  isMetricSys ? item.temperature.metric : item.temperature.imperial);
            let dataset = data.map(item => item.temperature)
            const maxVal = d3.max(dataset);
            const minVal = d3.min(dataset);
            const svgBBox = document.getElementById("area-chart-first").getBoundingClientRect();
            const width = svgBBox.width;
            const height = svgBBox.height;
            const margin = 4;

            if (second) {
                dataset = data.slice(5).map(item => item.temperature);
            } else {
                dataset = data.slice(0, 7).map(item => item.temperature);
            }

            // if (hidden) {
            //     dataset = data.slice(5).map(item => isMetricSys ?
            //         item.temperature.metric : item.temperature.imperial);
            // } else {
            //     dataset = data.slice(0, 7).map(item => isMetricSys ?
            //         item.temperature.metric : item.temperature.imperial);
            // }

            const horizPadding = width / (dataset.length);

            const svg = d3.select(`#${svgId}`);

            const scaleX = d3.scaleLinear()
                .domain([0, dataset.length - 1])
                .range([0, width - margin * 2]);
            const scaleY = d3.scaleLinear()
                .domain([minVal - 1, maxVal])
                .range([height, 25]);

            let charPlot;
            if (second) {
                charPlot = svg.append('g')
                    .attr("transform", `translate(-${horizPadding / 2 + margin * 2},0)`);
            } else {
                charPlot = svg.append('g')
                    .attr("transform", `translate(${horizPadding / 2 + margin},0)`);
            }

            const area = d3.area()
                .x((d, i) => scaleX(i) + margin / 2 * i)
                .y0(height)
                .y1(d => scaleY(d));
            const valueLine = d3.line()
                 .x((d, i) => scaleX(i) + margin / 2 * i)
                 .y(d => scaleY(d));

            charPlot.append("path")
                .data([dataset])
                .attr("d", area)
                .attr("class", "area")
                .attr("fill", "grey")
                .attr("fill-opacity", ".2")

            charPlot.append("path")
                .data([dataset])
                .attr("d", valueLine)
                .attr("class", "line");

            charPlot.selectAll("circle")
                .data(dataset)
                .enter()
                .append('circle')
                .attr("class", "point")
                .attr("r", 3)
                .attr("cx", (d, i) => scaleX(i) + margin / 2 * i)
                .attr("cy", d => scaleY(d))
                .style("fill", "none")
                .style("stroke-width", "2px")
                .style("stroke", d => {
                    if (d === minVal) return "#10cf10";
                    if (d === maxVal) return "#fc7f03";
                    return "#b9e0dd"
                });

            charPlot.selectAll('line')
                .data(dataset)
                .enter()
                .append("line")
                .attr("class", "value-line")
                .attr("x1",(d, i) => scaleX(i) + margin / 2 * i)
                .attr("y1", height)
                .attr("x2", (d, i) => scaleX(i) + margin / 2 * i)
                .attr("y2", d => scaleY(d))
                .style("stroke-width", "1px")
                .style("stroke", "white")
                .style("stroke-dasharray", "2");

            charPlot.selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .attr("class", "text")
                .attr("text-anchor", "middle")
                .attr("x", (d,i) => scaleX(i) + margin / 2 * i)
                .attr("y", d => scaleY(d) - margin * 2)
                .text(d => d + "\u{BA}")

            // dataset.map(data => console.log(scaleX(data)))

            // svg.selectAll('rect')
            //     .data(dataset)
            //     .enter()
            //     .append('rect')
            //     .attr("class", "bar")
            // .attr("x", (d, i) => scaleX(i))
            // .attr("y", d => scaleY(d))
            // .attr("width", width / dataset.length)
            // .attr("height", d => height - scaleY(d));


            //     .selectAll('rect')
            //     .data(dataset)
            //     .enter()
            //     .append('rect')
            //     .attr("class", "bar")
            //     .attr("x", d => scaleX(1))
            //     .attr("y", d => scaleY(d))
            //     .attr("width", width / dataset.length * 1.5)
            //     .attr("height", d => height - scaleY(d))
            // .attr("x", 0)
            // .attr("y", 10)
            // .attr("width", "30px")
            // .attr("height", "50px")
            // .style("stroke-width", "1px")
            // .style("stroke", "#154360")
            // .style("fill", "red");
        }

    }, [data, svgId, second])

    if (data.length === 0) return null;
    return (
        <svg id={svgId} width="100%" height="100%"></svg>
    )
}

export default AreaChart;