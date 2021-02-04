import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KendoVoiceComponent } from './kendo-voice.component';

describe('KendoVoiceComponent', () => {
  let component: KendoVoiceComponent;
  let fixture: ComponentFixture<KendoVoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KendoVoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KendoVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
