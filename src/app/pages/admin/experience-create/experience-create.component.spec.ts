import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceCreateComponent } from './experience-create.component';

describe('ExperienceCreateComponent', () => {
  let component: ExperienceCreateComponent;
  let fixture: ComponentFixture<ExperienceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
