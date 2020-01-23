import {Component, OnInit, ViewChild} from '@angular/core';
import {scaleLinear, select, line, mouse, selectAll} from 'd3';

interface DataPoint {
  x: number;
  y: number;
  updated?: boolean;
}

@Component({
  selector: 'app-data-join',
  templateUrl: './data-join.component.html',
  styleUrls: ['./data-join.component.scss'],
})
export class DataJoinComponent implements OnInit {
  @ViewChild('lineContainer', {static: true}) elementRef;
  data: DataPoint[] = [];
  xScale;
  yScale;
  width;
  height;

  editMode = 'add';

  constructor() {
  }

  ngOnInit() {
    this.width = 500;
    this.height = 600;

    this.data = [];

    this.setup();
    this.drawPath();
  }

  setup() {
    select('svg')
      .attr('height', this.height)
      .attr('width', this.width)
      .on('mousemove', this.handleMouseOver.bind(this))
      .on('click', this.handleClick.bind(this));

    this.xScale = scaleLinear().domain([0, this.width]).range([0, this.width]);
    this.yScale = scaleLinear().domain([this.height, 0]).range([this.height, 0]);
  }

  drawPath() {
    const lineGenerator = line<DataPoint>()
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y));

    const group = select('svg');

    group
      .selectAll('path')
      .data([this.data])
      .join('path')
      .attr('class', 'path-line')
      .attr('d', d=> lineGenerator(d))


    group
      .selectAll('circle.point')
      .data(this.data)
      .join(
        enter => enter
          .append('circle')
          .attr('class', 'point')
          .classed( 'point--new', true)
          .attr('cx', ({x}) => x)
          .attr('cy', ({y}) => y)
          .attr('r', 3)
          .on('click', (d, i, nodes) => {
            this.onPointClick(d, i, nodes);
            this.drawPath();
          }),
        update => update.classed('point--updated', d => d.updated ),
        exit => exit.attr('class', 'point-removed').remove());

  }

  onPointClick(d:DataPoint, i, nodes) {
    if (this.editMode === 'update') {
      d.updated = true;
    }

    if (this.editMode === 'remove') {
      const i = this.data.findIndex(datum => datum.x === d.x && datum.y === d.y);
      this.data.splice(i, 1);
    }
  }

  handleClick(d, i, nodes) {
    if (this.editMode === 'add') {
      const element = nodes[i];
      const [x, y] = mouse(element);

      this.addDataPoint({x, y});
    }
  }

  handleMouseOver(d, i, nodes) {
    if (this.editMode === 'add') {
      const element = nodes[i];
      const [x, y] = mouse(element);

      const selection = select(element);

      selection
        .selectAll('text')
        .data([{x, y}])
        .join('text')
        .classed('indication', true)
        .attr('x', ({x}) => x)
        .attr('y', ({y}) => y)
        .text(({x, y}) => `(${Math.round(x)}, ${Math.round(y)})`);

      selection
        .selectAll('circle.hover')
        .data([{x, y}])
        .join('circle')
        .attr('class', 'hover')
        .attr('fill', 'green')
        .attr('cx', ({x}) => x)
        .attr('cy', ({y}) => y)
        .attr('r', 1);
    }

  }

  addDataPoint(point: DataPoint) {
    this.data.push(point);

    this.drawPath();
  }

  setEditMode(mode) {
    this.editMode = mode;

    if(this.editMode !== 'add') {
      selectAll('circle.hover, text.indication').remove();
    }
  }
}
