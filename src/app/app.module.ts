import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartContainerComponent } from './components/chart-container/chart-container.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartConfigurationComponent } from './components/chart-configuration/chart-configuration.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartContainerComponent,
    ChartComponent,
    ChartConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
