import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';
import { S1ColorScaler } from './s1-color-scaler';
import { defer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Gets the main/dominant color of an image
 */

@Directive({
  selector: '[s1ColorGrabber]',
})
export class ColorGrabberDirective implements OnDestroy {
  @Input() count = 4; // number of wanted main colors
  @Output() mainColors: EventEmitter<string[]> = new EventEmitter(); // main colors rbg values
  private unsubscribe: Subject<void> = new Subject();
  constructor(private el: ElementRef) {}

  @HostListener('load') onLoad() {
    defer(() => S1ColorScaler.extractMainColors(this.el.nativeElement.src, this.count))
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((colors: string[]) => {
        this.mainColors.emit(colors);
      });
  }

  @HostListener('error') onError() {
    // todo: handle err
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
