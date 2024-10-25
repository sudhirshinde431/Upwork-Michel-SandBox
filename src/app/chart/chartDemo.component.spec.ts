import { ComponentFixture, TestBed } from '@angular/core/testing';

import { chartDemoComponent } from './chartDemo.component';

describe('ChartComponent', () => {
  let component: chartDemoComponent;
  let fixture: ComponentFixture<chartDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [chartDemoComponent]
    });
    fixture = TestBed.createComponent(chartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
