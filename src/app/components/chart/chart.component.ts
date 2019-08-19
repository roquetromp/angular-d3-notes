import { Component, OnInit, ViewEncapsulation, Input, OnChanges, HostListener } from '@angular/core';
import { CanvasDimensions } from '../../models/canvas-dimensions.model';
import { DataPoint } from '../../models/data-points.model';
import { TimeRange } from '../../models/time-range.model';
import { ValueRange } from '../../models/value-range.model';
import { select, scaleLinear, axisBottom, axisLeft, line, svg, timeMinute } from 'd3';
import { Selection } from 'd3-selection'
import { Margin } from '../../models/margin.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() canvasDimensions: CanvasDimensions = {
    height: window.innerHeight - 200,
    width: window.innerWidth - 200,
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

  @Input() xDomain: number[];
  @Input() yDomain: number[] = [10, 0];

  canvas: Selection<any, any, HTMLElement, DataPoint>
  xScale: any;
  yScale: any;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.canvasDimensions.width = event.target.innerWidth - 200;
    this.canvasDimensions.height = event.target.innerHeight - 200;
    this.canvas.remove();
    this.drawChart();
  }

  ngOnInit() {
    this.drawChart();
  }

  ngOnChanges() {
    if (this.canvas) {
      this.canvas.remove();
      this.drawChart();
    }
  }

  private drawChart() {
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
    const xAxis = axisBottom(this.xScale)
      .ticks(30)
      .tickSizeInner(-this.canvasDimensions.height)
      .tickPadding(10)
      .tickFormat(d=> `:${d.valueOf()}`)

    const yAxis = axisLeft(this.yScale).tickSizeInner(-this.canvasDimensions.width);

    this.canvas.append('g')
      .attr('class', 'axis x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.canvasDimensions.height})`)
      .call(xAxis);

    this.canvas.append('g')
      .attr('class', 'axis y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(yAxis);

  }
  private initScale() {
    this.xScale = scaleLinear().range([0, this.canvasDimensions.width]).domain(this.xDomain);
    this.yScale = scaleLinear().range([0, this.canvasDimensions.height]).domain(this.yDomain);
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
