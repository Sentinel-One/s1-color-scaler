import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorScalerComponent } from './color-scaler.component';

describe('ColorScalerComponent', () => {
  let component: ColorScalerComponent;
  let fixture: ComponentFixture<ColorScalerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorScalerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorScalerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
