import { Injectable } from '@angular/core';
import { DataPoint } from '../models/data-points.model';

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {

  constructor() { }

  public getDataPoints(): DataPoint[] {

    return [{
      x: 0,
      y: 'A'
    }, {
      x: 30,
      y: 'C'
    },{
      x: 60,
      y: 'F'
    }];
  }
}
