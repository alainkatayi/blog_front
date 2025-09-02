import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationCreateComponent } from './certification-create.component';

describe('CertificationCreateComponent', () => {
  let component: CertificationCreateComponent;
  let fixture: ComponentFixture<CertificationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
