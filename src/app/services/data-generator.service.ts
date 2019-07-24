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
      y: 0
    }, {
      x: 10,
      y: 10
    }];
  }
}
