import { Component, OnInit } from '@angular/core';
import { S1ColorScaler } from '../../../projects/s1-color-scaler/src/lib/s1-color-scaler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 's1-color-scaler-example';
  colors;
  theme;
  // todo make a proper demo
  ngOnInit(): void {
    const scaler = S1ColorScaler.from('assets/s1_bg.jpg');
    scaler.getMainColorsScale$(5).subscribe((colors) => {
      this.colors = colors;
      console.log(colors);
    });
    scaler.getMainColorsTheme$(5).subscribe((colors) => {
      this.theme = colors;
    });
  }
}
