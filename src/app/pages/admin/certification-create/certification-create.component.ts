import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../core/models/category';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { ArticleService } from '../../../core/services/articles/article.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink} from '@angular/router';



@Component({
  selector: 'app-certification-create',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './certification-create.component.html',
  styleUrl: './certification-create.component.css'
})
export class CertificationCreateComponent {
  createCertificationForm!: FormGroup
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
    this.createCertificationForm = this.fb.group({
      name: ['', Validators.required],
      organisme: ['', Validators.required],
      obtaining_date: ['', Validators.required],
    })
  }

  onSubmit() {
    this.isSubmited = true
    if (this.createCertificationForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Please fill out the form correctly"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("erreur lors de création")
    }

    const formValuer = this.createCertificationForm.value
    const formData = new FormData

    formData.append('name', formValuer.name)
    formData.append('organisme', formValuer.name)
    formData.append('obtaining_date', formValuer.obtaining_date)
  

    this.profileService.createCertification(formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "certification successfully created"
        this.toastType = 'success'

        setTimeout(() => {
          this.showToast = false
          this.router.navigate(['/blog-aYdXmXiBn/certification-list'])
        }, 2000)
        console.log("certification successfully created", response)
      },

      error: (error) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Please fill out the form correctly"
        this.toastType = 'error'
        console.log("erreur", error)
      }
    })
  }
}
