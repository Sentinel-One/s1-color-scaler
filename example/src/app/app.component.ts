import { AfterViewInit, Component, OnInit } from '@angular/core';
import { S1ColorScaler } from '../../../projects/s1-color-scaler/src/lib/s1-color-scaler';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  colors;
  theme;
  // todo make a proper demo
  ngAfterViewInit(): void {
    const scaler = S1ColorScaler.from('assets/logo.png');

    scaler.getMainColorsScale$(5).subscribe((colors) => {
      this.colors = colors;
    });
    scaler.getMainColorsTheme$(5).subscribe((colors) => {
      this.theme = colors;
    });
  }

  haveColors() {
    return this.colors?.length > 1 && this.theme?.length > 1;
  }
}
