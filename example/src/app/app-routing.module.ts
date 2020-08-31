import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ExportChartDemoComponent } from './export-chart-demo/export-chart-demo.component';
import { ColorScalerComponent } from './color-scaler/color-scaler.component';

const appRoutes: Routes = [
  {
    path: 'colors',
    component: ColorScalerComponent,
  },
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
