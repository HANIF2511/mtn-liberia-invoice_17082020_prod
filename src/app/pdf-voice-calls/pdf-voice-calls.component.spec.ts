import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfVoiceCallsComponent } from './pdf-voice-calls.component';

describe('PdfVoiceCallsComponent', () => {
  let component: PdfVoiceCallsComponent;
  let fixture: ComponentFixture<PdfVoiceCallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfVoiceCallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfVoiceCallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
