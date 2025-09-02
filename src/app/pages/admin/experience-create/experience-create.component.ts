import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../core/models/category';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { ArticleService } from '../../../core/services/articles/article.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-experience-create',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './experience-create.component.html',
  styleUrl: './experience-create.component.css'
})
export class ExperienceCreateComponent {
  createExperienceForm!: FormGroup
  isSubmited = false
  showToast = false
  toastType: 'success' | 'error' = 'success'
  toastMessage = ''
  errorMessage = ''
  successMessage = ''
  category!: Category[]
  private router = inject(Router)

  constructor(private profileService: ProfileService, private fb: FormBuilder) { }
  ngOnInit() {
    this.createExperienceForm = this.fb.group({
      job_title: ['', Validators.required],
      entreprise_name: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  onSubmit() {
    this.isSubmited = true
    if (this.createExperienceForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Please fill out the form correctly"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("error")
    }

    const formValuer = this.createExperienceForm.value
    const formData = new FormData

    formData.append('job_title', formValuer.job_title)
    formData.append('entreprise_name', formValuer.entreprise_name)
    formData.append('start_date', formValuer.start_date)
    formData.append('end_date', formValuer.end_date)
    formData.append('description', formValuer.description)


    this.profileService.createExperience(formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "experience created with success"
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
