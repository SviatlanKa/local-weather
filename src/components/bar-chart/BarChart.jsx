import * as d3 from 'd3';
import React, { Component } from "react";
import './BarChart.css';

class BarChart extends Component {
    constructor(props){
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }
    componentDidMount() {
        this.createBarChart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.createBarChart();
    }

    createBarChart = () => {
        const dataset = this.props.data.map(item => this.props.isMetricSys ?
            item.temperature.metric : item.temperature.imperial);
        console.log(this.props);
        const node = this.node;
        const width = node.width.animVal;
        const height = node.height.baseVal;
        console.log(width,height)
        d3.select(node)
            .append("rect")
            .attr("x", 0)
            .attr("y", 10)
            .attr("width", "30px")
            .attr("height", "50px")
            .style("stroke-width", "1px")
            .style("stroke", "#154360")
            .style("fill", "red")
        //
        // const maxVal = d3.max(dataset);
        // const scaleY = d3.scaleLinear()
        //     .domain([0, maxVal])
        //     .range([height, 0]);
        // const scaleX = d3.scaleLinear()
        //     .domain([0, dataset.length])
        //     .range([0, width]);
        // d3.select(node)
        //     .selectAll('rect')
        //     .data(dataset)
        //     .enter()
        //     .append('rect')
        //     .attr("class", "bar")
        //     .attr("x", d => scaleX(1))
        //     .attr("y", d => scaleY(d))
        //     .attr("width", width / dataset.length * 1.5)
        //     .attr("height", d => height - scaleY(d))
    }
    render() {
        return (
            <svg ref={node => this.node = node} width="100%" height="100%">
            </svg>
        )
    }
}

export default BarChart;