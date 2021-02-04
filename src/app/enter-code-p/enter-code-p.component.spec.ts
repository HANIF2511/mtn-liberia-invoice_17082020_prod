import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterCodePComponent } from './enter-code-p.component';

describe('EnterCodePComponent', () => {
  let component: EnterCodePComponent;
  let fixture: ComponentFixture<EnterCodePComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterCodePComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterCodePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
