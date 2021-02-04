import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCompComponent } from './pdf-comp.component';

describe('PdfCompComponent', () => {
  let component: PdfCompComponent;
  let fixture: ComponentFixture<PdfCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
