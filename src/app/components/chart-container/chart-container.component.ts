import { Component, OnInit } from '@angular/core';
import { DataPoint } from '../../models/data-points.model';
import { DataGeneratorService } from '../../services/data-generator.service';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {

  dataPoints:DataPoint[];
  constructor(private dataGeneratorService:DataGeneratorService) { }

  ngOnInit() {
    this.dataPoints = this.dataGeneratorService.getDataPoints();
  }

}
