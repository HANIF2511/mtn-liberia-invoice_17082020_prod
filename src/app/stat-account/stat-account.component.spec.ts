import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatAccountComponent } from './stat-account.component';

describe('StatAccountComponent', () => {
  let component: StatAccountComponent;
  let fixture: ComponentFixture<StatAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
