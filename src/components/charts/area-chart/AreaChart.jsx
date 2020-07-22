import * as d3 from 'd3';
import React, {useEffect, useRef} from "react";
import './AreaChart.css';

const AreaChart = ({ data, isMetricSys, width, height, second }) => {
    const firstRef = useRef(null);
    const secondRef = useRef(null);

    useEffect(() => {
        if (data.length > 0 && width > 0) {
            let dataset = data.map(item => isMetricSys ? item.temperature.metric : item.temperature.imperial);
            const maxVal = d3.max(dataset);
            const minVal = d3.min(dataset);
            const margin = 4;

            if (second) {
                dataset = data.slice(5).map(item => isMetricSys ?
                    item.temperature.metric : item.temperature.imperial);
            } else {
                dataset = data.slice(0, 7).map(item => isMetricSys ?
                    item.temperature.metric : item.temperature.imperial);
            }

            const horizPadding = width / (dataset.length);

            let svg = d3.select(firstRef.current);
            if (second) svg = d3.select(secondRef.current);

            svg.selectAll('*').remove();

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
                .attr("class", "value-line");

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
                .attr("class", "line")
                .attr("x1", (d, i) => scaleX(i) + margin / 2 * i)
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
                .attr("x", (d, i) => scaleX(i) + margin / 2 * i)
                .attr("y", d => scaleY(d) - margin * 2)
                .text(d => d + "\u{BA}");
        }
    }, [data, isMetricSys, width, height, second]);

    if (data.length === 0 || width === 0) return null;

    if (second) {
        return <svg ref={secondRef} width={width} height={height}></svg>
    }

    return <svg ref={firstRef} width={width} height={height}></svg>
};

export default AreaChart;