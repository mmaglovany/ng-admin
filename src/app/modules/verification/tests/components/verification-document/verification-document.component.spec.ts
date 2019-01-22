import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationDocumentComponent } from '../../../components/verification-document/verification-document.component';

describe('VerificationDocumentComponent', () => {
  let component: VerificationDocumentComponent;
  let fixture: ComponentFixture<VerificationDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
