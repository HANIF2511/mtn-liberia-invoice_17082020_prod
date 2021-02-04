import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelVoiceComponent } from './excel-voice.component';

describe('ExcelVoiceComponent', () => {
  let component: ExcelVoiceComponent;
  let fixture: ComponentFixture<ExcelVoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelVoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
