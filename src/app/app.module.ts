import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartContainerComponent } from './components/chart-container/chart-container.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartConfigurationComponent } from './components/chart-configuration/chart-configuration.component';
import { DataJoinContainerComponent } from './components/data-join-container/data-join-container.component';
import { DataJoinComponent } from './components/data-join/data-join.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartContainerComponent,
    ChartComponent,
    ChartConfigurationComponent,
    DataJoinContainerComponent,
    DataJoinComponent,
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
