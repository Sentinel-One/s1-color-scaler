import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { S1ColorScalerModule } from '../../../projects/s1-color-scaler/src/lib/s1-color-scaler.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, S1ColorScalerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
