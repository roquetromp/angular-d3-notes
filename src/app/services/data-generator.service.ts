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
      x: 10,
      y: 'B'
    }, {
      x: 13,
      y: 'B'
    },{
      x: 16,
      y: 'C'
    },{
      x: 20,
      y: 'C'
    },{
      x: 30,
      y: 'D'
    },{
      x: 33,
      y: 'D'
    },{
      x: 38,
      y: 'F'
    },{
      x: 40,
      y: 'F'
    }];
  }
}
