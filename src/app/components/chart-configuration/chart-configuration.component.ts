import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Domain {
  lowerBound: number;
  upperBound: number;
}

@Component({
  selector: 'app-chart-configuration',
  templateUrl: './chart-configuration.component.html',
  styleUrls: ['./chart-configuration.component.scss']
})
export class ChartConfigurationComponent implements OnInit {

  configForm:FormGroup;
  @Output() onDomainSubmit:EventEmitter<Domain> = new EventEmitter();
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.configForm = this.fb.group({
      lowerBound: [0, [Validators.required]],
      upperBound: [60, [Validators.required]],
    })
  }

  submitDomain(){
    if(this.configForm.valid){
      this.onDomainSubmit.emit(this.configForm.value);
    }
  }
}
