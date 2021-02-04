import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoChartsComponent } from './kendo-charts.component';

describe('KendoChartsComponent', () => {
  let component: KendoChartsComponent;
  let fixture: ComponentFixture<KendoChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KendoChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
