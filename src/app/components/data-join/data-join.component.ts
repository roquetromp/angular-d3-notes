import { Component, OnInit } from '@angular/core';
import { scaleLinear, select, line } from 'd3';

interface DataPoint {
  x: number;
  y: number;
}

@Component({
  selector: 'app-data-join',
  templateUrl: './data-join.component.html',
  styleUrls: ['./data-join.component.scss']
})
export class DataJoinComponent implements OnInit {

  data: DataPoint[] = [];
  xScale;
  yScale;

  width = 400;
  height = 400;

  constructor() { }

  ngOnInit() {
    this.data = [{ x: 1, y: 1 }, { x: 2, y: 2 }];

    this.setup();
    this.drawPath();
  }

  setup() {
    select('svg').attr('height', this.height).attr('weight', this.width);

    this.xScale = scaleLinear().domain([0, 10]).range([0, this.width]);
    this.yScale = scaleLinear().domain([10, 0]).range([this.height, 0]);
  }

  drawPath() {
    const lineGenerator = line<DataPoint>()
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y));

    select('svg')
      .append('g')
      .append('path')
      .datum(this.data)
      .join('path')
      .attr('stroke', 'red')
      .attr('d', lineGenerator);
  }

  addDataPoint() {
    const { x, y } = this.data[this.data.length - 1];

    this.data.push({
      x: x + 1,
      y: y + 1
    });

    this.drawPath();
  }
}
