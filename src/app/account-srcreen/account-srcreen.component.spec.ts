import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSrcreenComponent } from './account-srcreen.component';

describe('AccountSrcreenComponent', () => {
  let component: AccountSrcreenComponent;
  let fixture: ComponentFixture<AccountSrcreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSrcreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSrcreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
