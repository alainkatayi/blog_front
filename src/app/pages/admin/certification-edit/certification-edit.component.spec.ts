import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationEditComponent } from './certification-edit.component';

describe('CertificationEditComponent', () => {
  let component: CertificationEditComponent;
  let fixture: ComponentFixture<CertificationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
