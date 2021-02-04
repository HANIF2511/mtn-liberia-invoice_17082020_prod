import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPComponent } from './forgot-p.component';

describe('ForgotPComponent', () => {
  let component: ForgotPComponent;
  let fixture: ComponentFixture<ForgotPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
