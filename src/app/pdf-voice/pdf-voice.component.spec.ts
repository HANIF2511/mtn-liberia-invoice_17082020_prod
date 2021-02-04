import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfVoiceComponent } from './pdf-voice.component';

describe('PdfVoiceComponent', () => {
  let component: PdfVoiceComponent;
  let fixture: ComponentFixture<PdfVoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfVoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
