import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { CanvasDimensions } from '../../models/canvas-dimensions.model';
import { DataPoint } from '../../models/data-points.model';
import { TimeRange } from '../../models/time-range.model';
import { ValueRange } from '../../models/value-range.model';
import { select, scaleLinear, axisBottom, axisLeft, line } from 'd3';
import { Selection } from 'd3-selection'
import { Margin } from '../../models/margin.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit {
  @Input() canvasDimensions: CanvasDimensions = {
    height: 500,
    width: 500,
  };

  @Input() margin: Margin = {
    top: 30,
    bottom: 30,
    left: 50,
    right: 50
  };
  @Input() dataPoints: DataPoint[];
  @Input() timeRange: TimeRange;
  @Input() valueRange: ValueRange;
  canvas: Selection<any, any, HTMLElement, DataPoint>
  xScale: any;
  yScale: any;

  constructor() { }

  ngOnInit() {
    this.initCanvas();
    this.initScale();
    this.initAxis();
    this.updateGraph();
  }

  private initCanvas() {
    this.canvas = select('.chart')
      .append('svg')
      .attr('width', this.canvasDimensions.width + this.margin.left + this.margin.right)
      .attr('height', this.canvasDimensions.height + this.margin.top + this.margin.bottom)

  }
  private initAxis() {
    const xAxis = axisBottom(this.xScale);
    const yAxis = axisLeft(this.yScale);

    this.canvas.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.canvasDimensions.height})`)
      .call(xAxis);

    this.canvas.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(yAxis);

  }
  private initScale() {
    this.xScale = scaleLinear().range([0, this.canvasDimensions.width]).domain([0, 10]);
    this.yScale = scaleLinear().range([0, this.canvasDimensions.height]).domain([10, 0]);
  }
  private updateGraph() {

    const dataLine = line<DataPoint>()
      .x(d => this.xScale(d.x))
      .y(d => this.yScale(d.y));

    this.canvas.data(this.dataPoints)
      .append('g')
      .append('path')
      .attr('d', dataLine(this.dataPoints))
      .attr('stroke', 'red')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
  }


}
