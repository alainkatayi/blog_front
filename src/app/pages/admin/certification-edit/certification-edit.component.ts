import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../core/models/category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { response } from 'express';
import { ArticleService } from '../../../core/services/articles/article.service';


@Component({
  selector: 'app-certification-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './certification-edit.component.html',
  styleUrl: './certification-edit.component.css'
})
export class CertificationEditComponent {
  editCertificationForm!: FormGroup
  isSubmited = false
  showToast = false
  toastType: 'success' | 'error' = 'success'
  toastMessage = ''
  errorMessage = ''
  successMessage = ''
  category!: Category[]
  certificationId!: number
  private router = inject(Router)

  constructor(private profileService: ProfileService, private fb: FormBuilder, private route: ActivatedRoute, private articleService: ArticleService) { }

  loadCertificationData(): void {
    this.profileService.getCertification(this.certificationId).subscribe({
      next: (response) => {
        this.editCertificationForm.patchValue(response)
      }
    })
  }

  getCategories() {
    this.articleService.getCategories().subscribe({
      next: (response) => {
        this.category = response
        console.log(" categories", response)
      },
      error: (error) => {
        console.log("error", error)
      }
    })
  }


  ngOnInit() {
    this.editCertificationForm = this.fb.group({
      name: ['', Validators.required],
      organisme: ['', Validators.required],
      obtaining_date: [Validators.required]
    })

    this.certificationId = +this.route.snapshot.paramMap.get('id')!
    this.loadCertificationData()
    this.getCategories()
  }

  onSubmit() {
    this.isSubmited = true
    if (this.editCertificationForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Please fill out the form correctly"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("error")

    }

    const formValue = this.editCertificationForm.value
    const formData = new FormData

    formData.append('name', formValue.name)
    formData.append('organisme', formValue.organisme)
    formData.append('obtaining_date', formValue.obtaining_date)

    this.profileService.editCertification(this.certificationId, formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Certification edited successfully"
        this.toastType = 'success'

        setTimeout(() => {
          this.showToast = false
          this.router.navigate(['/blog-aYdXmXiBn/certification-list'])
        }, 2000)
        console.log("certification update", response)
      },

      error: (error) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Please fill out the form correctly"
        this.toastType = 'error'
        console.log("error", error)
      }
    })


  }
}


