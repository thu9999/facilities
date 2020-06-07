import React, { useState, useRef, useEffect } from 'react'
import { TimelineProp, TimelineData } from './interfaces';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { schemeSet2 } from 'd3-scale-chromatic';

const TimelineChart = (props: TimelineProp) => {

    const { schedules } = props;

    /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
    const ref = useRef<SVGSVGElement | null>(null);

    const [ selection, setSelection ] = useState<null | Selection<
        SVGSVGElement | null,
        unknown,
        null,
        undefined
    >>(null);

    /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
    useEffect(() => {
        if(!selection) {
            setSelection(select(ref.current));
        } else {

            let data: TimelineData[] = schedules.map(schedule => {
                return {
                    name: schedule.facility,
                    from: schedule.range[0],
                    to: schedule.range[1]
                }
            });

            const name = (d: any) => d.name as string;

            const width = 800;
            const height = 400;
            const margin = {
                top: 40,
                right: 40,
                bottom: 40,
                left: 80
            };
        
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            selection.attr('viewBox', `0 0 ${width} ${height}`);

            const chart = selection.append('g')
                .attr('class', 'timeline-chart')
                .attr('transform', `translate(${margin.left}, ${margin.top})`);

            // xScale
            const xScale = scaleLinear()
                .domain([0, 24]) // 24 hours
                .range([0, innerWidth]);
        
            // yScale
            const yScale = scaleBand()
                .domain(data.map(d => name(d)))
                .range([innerHeight, 0])
                .padding(0.9);
        
            // xAxis
            const xAxis = axisBottom(xScale)
                .tickSize(-innerHeight)
                .tickPadding(12);
        
            // xAxis group
            const xG = chart.append('g')
                .attr('class', 'xaxis-group')
                .attr('transform', `translate(0, ${innerHeight})`)
                .call(xAxis);

            const stroke = '#EFECEA';
            xG.selectAll('.tick line')
                .attr('stroke', stroke)
                .attr('stroke-width', 1);

            xG.select('path').remove();

            // yAxis
            const yAxis = axisLeft(yScale);

            // yAxis group
            const yG = chart.append('g')
                .attr('class', 'yaxis-group')
                .call(yAxis);

            yG.selectAll('.tick line, path').remove();

            // Colors
            const colors = scaleOrdinal()
                .domain(data.map(d => name(d)))
                .range(schemeSet2);

            const timelines = chart.append('g')
                .attr('class', 'timelines');

            // Draw tooltip
            const tooltip = (x: number, y: number, text: string) => {
                const tipWidth = text.length * 8;
                const tip = chart.append('g')
                    .attr('class', 'tooltip');

                tip.append('rect')
                    .attr('x', x - tipWidth / 2)
                    .attr('y', y - 30)
                    .attr('width', tipWidth)
                    .attr('height', 24)
                    .attr('fill', '#001529')
                    .attr('opacity', 0.6)
                    .attr('rx', 4)
                    .attr('ry', 4);

                tip.append('text')
                    .attr('x', x)
                    .attr('y', y - 15)
                    .attr('text-anchor', 'middle')
                    .attr('fill', '#fff')
                    .style('font-size', '12px')
                    .text(text)

                return tip;
            }

            timelines.selectAll('.timeline')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'timeline')
                .attr('x', d => xScale(d.from))
                .attr('y', d => {
                    const y = yScale(name(d));
                    if(y) {
                        return y;
                    } 
                    return null;
                })
                .attr('width', d => xScale(d.to - d.from))
                .attr('height', yScale.bandwidth())
                .attr('fill', d => {
                    const color: string = colors(name(d)) as string;
                    if(color) {
                        return color ;
                    }
                    return 'black';
                })
                .attr('rx', yScale.bandwidth() / 2)
                .attr('ry', yScale.bandwidth() / 2)
                .attr('cursor', 'pointer')
                .on('mouseover', function(d) {
                    const x = xScale(d.from + d.to) / 2;
                    const y = yScale(name(d)) as number;
                    const text = `${name(d)} ${d.from} - ${d.to}`;
                    console.log(text)
                    tooltip(x, y, text);
                })
                .on('mouseleave', () => {
                    chart.selectAll('.tooltip').remove();
                })
        }

        return () => {
            selection?.selectAll('.timeline-chart').remove();
        }

    }, [selection, schedules])
    

    return (
        <svg ref={ref} width={800} height={400} />
    );
}

export default TimelineChart;