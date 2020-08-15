import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { S1ColorScaler } from '../../../../projects/s1-graphic-capsules/src/lib/color-scaler/s1-color-scaler';

@Component({
  selector: 'app-color-scaler',
  templateUrl: './color-scaler.component.html',
  styleUrls: ['./color-scaler.component.css']
})
export class ColorScalerComponent implements AfterViewInit {
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
