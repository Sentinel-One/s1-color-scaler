import * as d3 from 'd3';
import { HierarchyNode } from 'd3';

export class BubblesChart {
  static update <T>(group: T) {

    // Set dimensions.
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const width = 500 - margin.right - margin.left;
    const height = 400 - margin.top - margin.bottom;

    const root: HierarchyNode<T> = d3.hierarchy(group)
      .sum((d: any) => d.id);

    // Circle pack layout.
    const packLayout = d3
      .pack()
      .size([width, height])
      .padding(10);

    packLayout(root);

    // Draw
    const svgElement = d3.select('.container')
      .append('svg')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .node();

    const svg = d3.select(svgElement);

    const leaf = svg.selectAll('g')
      .data(root.leaves())
      .enter()
      .append('g')
      .attr('class', 'circ')
      .attr('transform', (d: any) => `translate(${d.x + 1},${d.y + 1})`);

    const circle = leaf.append('circle')
      .attr('r',  (d: any) => d.r + 4)
      .attr('fill', d => 'hotpink')
    .style('opacity', '0.6');

    const icon = `M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z`;
    const heart = leaf
      .append('path')
      .attr('transform', (d: any) => `translate(-15.5, -11)`)
      .attr('d', (d) => icon)
      .attr('fill', 'tomato')
      .transition()
      .duration(2000)
      .ease(d3.easeBounce)
      .attr('transform', 'scale(0.5)')
      .end();

    heart.then(() => {
      svg.selectAll('path')
        .transition()
        .duration(2000)
        .ease(d3.easeBackOut)
      .attr('transform', 'translate(-15.5, -11) scale(1)');
    });

    return svg.node();
  }
}
