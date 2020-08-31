import { Component, OnDestroy, OnInit } from '@angular/core';
import { svgToPng$ } from '../../../../projects/s1-graphic-capsules/src/lib/svg-to-png/svg-to-png';
import { categories } from './data';
import { BubblesChart } from './chart';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-export-chart-demo',
  template: `
    <div class="export" (click)="onClick()">Export SVG to PNG</div>
    <div class="container">
    </div>`,
  styleUrls: ['./export-chart-demo.component.css']
})
export class ExportChartDemoComponent implements OnInit, OnDestroy {

  svgElement: SVGGraphicsElement;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.svgElement = BubblesChart.update(categories);
  }

  onClick() {
    svgToPng$(this.svgElement, 'svg2pbg', { width: 900, height: 900 })
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result) => {
      console.log(result);
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
