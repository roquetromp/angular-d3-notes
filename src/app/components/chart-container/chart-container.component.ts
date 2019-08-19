import { Component, OnInit } from '@angular/core';
import { DataPoint } from '../../models/data-points.model';
import { DataGeneratorService } from '../../services/data-generator.service';
import { Domain } from '../chart-configuration/chart-configuration.component';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.scss']
})
export class ChartContainerComponent implements OnInit {

  dataPoints:DataPoint[];
  xDomain:number[] = [0, 60];

  constructor(private dataGeneratorService:DataGeneratorService) { }

  ngOnInit() {
    this.dataPoints = this.dataGeneratorService.getDataPoints();
  }

  onDomainSubmit($event:Domain){
    this.xDomain = [$event.lowerBound, $event.upperBound];
  }

}
