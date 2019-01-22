import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportAttachmentsComponent } from './support-attachments.component';

describe('supportAttachmentsComponent', () => {
  let component: SupportAttachmentsComponent;
  let fixture: ComponentFixture<SupportAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
