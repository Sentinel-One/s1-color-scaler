import { AfterViewInit, Component, OnInit } from '@angular/core';
import { S1ColorScaler } from '../../../projects/s1-graphic-capsules/src/lib/color-scaler/s1-color-scaler';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  colors;
  fromDirective;
  mainColor$: Observable<string>;
  // todo make a proper demo
  ngAfterViewInit(): void {
    const scaler = S1ColorScaler.from('assets/logo.png');
    this.mainColor$ = scaler.getMainColor$();
    scaler.getMainColorsScale$(4).subscribe((colors) => {
      this.colors = colors;
    });
  }

  haveColors() {
    return this.colors?.length > 1;
  }

  getMainColors(colors: string[]) {
    this.fromDirective = colors;
  }
}
