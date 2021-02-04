import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatPdfAccountComponent } from './stat-pdf-account.component';

describe('StatPdfAccountComponent', () => {
  let component: StatPdfAccountComponent;
  let fixture: ComponentFixture<StatPdfAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatPdfAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatPdfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
