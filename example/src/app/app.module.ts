import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { S1ColorScalerModule } from '../../../projects/s1-graphic-capsules/src/lib/color-scaler/s1-color-scaler.module';
import { AppRoutingModule } from './app-routing.module';
import { ExportChartDemoComponent } from './export-chart-demo/export-chart-demo.component';

@NgModule({
  declarations: [AppComponent, ExportChartDemoComponent],
  imports: [BrowserModule, AppRoutingModule, S1ColorScalerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
