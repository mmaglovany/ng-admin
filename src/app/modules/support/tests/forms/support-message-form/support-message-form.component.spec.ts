import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportMessageFormComponent } from '../../../forms/support-message-form/support-message-form.component';

describe('SupportMessageFormComponent', () => {
  let component: SupportMessageFormComponent;
  let fixture: ComponentFixture<SupportMessageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupportMessageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
