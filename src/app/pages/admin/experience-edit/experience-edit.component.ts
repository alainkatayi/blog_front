import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../core/models/category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-edit',
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './experience-edit.component.html',
  styleUrl: './experience-edit.component.css'
})
export class ExperienceEditComponent {
  EditExperienceForm!: FormGroup
  isSubmited = false
  showToast = false
  toastType: 'success' | 'error' = 'success'
  toastMessage = ''
  errorMessage = ''
  successMessage = ''
  category!: Category[]
  experienceId!: number
  private router = inject(Router)

  constructor(private profileService: ProfileService, private fb: FormBuilder,private route: ActivatedRoute) { }

    loadSkillData(): void {
    this.profileService.getExperience(this.experienceId).subscribe({
      next: (response) => {
        this.EditExperienceForm.patchValue(response)
      }
    })
  }
  ngOnInit() {
    this.EditExperienceForm = this.fb.group({
      job_title: ['', Validators.required],
      entreprise_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.experienceId = +this.route.snapshot.paramMap.get('id')!
    this.loadSkillData()
  }

  onSubmit() {
    this.isSubmited = true
    if (this.EditExperienceForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Please fill out the form correctly"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("error")
    }

    const formValuer = this.EditExperienceForm.value
    const formData = new FormData

    formData.append('job_title', formValuer.job_title)
    formData.append('entreprise_name', formValuer.entreprise_name)
    formData.append('start_date', formValuer.start_date)
    formData.append('end_date', formValuer.end_date)
    formData.append('description', formValuer.description)


    this.profileService.editExperience(this.experienceId,formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "experience edit with success"
        this.toastType = 'success'

        setTimeout(() => {
          this.showToast = false
          this.router.navigate(['/blog-aYdXmXiBn/experience-list'])
        }, 2000)
        console.log("experience create", response)
      },

      error: (error) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Please fill out the form correctly"
        this.toastType = 'error'
        console.log("Please fill out the form correctly", error)
      }
    })
  }
}
