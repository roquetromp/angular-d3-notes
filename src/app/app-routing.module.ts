import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartContainerComponent } from './components/containers/chart-container/chart-container.component';
import { DataJoinContainerComponent } from './components/containers/data-join-container/data-join-container.component';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: '/data-join'
}, {
  path: 'chart',
  component: ChartContainerComponent
}, {
  path: 'data-join',
  component: DataJoinContainerComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
