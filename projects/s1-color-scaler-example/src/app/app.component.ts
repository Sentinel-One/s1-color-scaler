import { Component, OnInit } from '@angular/core';
import { S1ColorScaler } from '../../../s1-color-scaler/src/lib/s1-color-scaler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 's1-color-scaler-example';
  // todo make a proper demo
  ngOnInit(): void {
    const scaler = S1ColorScaler.from('assets/logo.png');
    scaler.getMainColorsScale$(3).subscribe((colors) => {
      console.log(colors);
    });
  }
}
