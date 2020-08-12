import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ExportChartDemoComponent } from './export-chart-demo/export-chart-demo.component';

const appRoutes: Routes = [
  {
    path: 'export-svg-to-png',
    component: ExportChartDemoComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],

  exports: [RouterModule]
})
export class AppRoutingModule{
}
