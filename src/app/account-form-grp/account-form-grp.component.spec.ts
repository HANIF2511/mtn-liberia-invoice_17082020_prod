import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormGrpComponent } from './account-form-grp.component';

describe('AccountFormGrpComponent', () => {
  let component: AccountFormGrpComponent;
  let fixture: ComponentFixture<AccountFormGrpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountFormGrpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFormGrpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
