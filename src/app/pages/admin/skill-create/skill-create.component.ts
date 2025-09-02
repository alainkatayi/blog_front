import { response } from 'express';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../core/models/category';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { ArticleService } from '../../../core/services/articles/article.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-skill-create',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './skill-create.component.html',
  styleUrl: './skill-create.component.css'
})
export class SkillCreateComponent {

  createSkillForm!: FormGroup
  isSubmited = false
  showToast = false
  toastType: 'success' | 'error' = 'success'
  toastMessage = ''
  errorMessage = ''
  successMessage = ''
  category!: Category[]
  private router = inject(Router)
  

  constructor(private profileService: ProfileService, private categoryService: ArticleService, private fb: FormBuilder) { }


  ngOnInit() {
    this.getCategories()
    this.createSkillForm = this.fb.group({
      name: ['', Validators.required],
      category_id: ['', Validators.required],

    })
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.category = response
      },

      error: (error) => {
        console.log(error)
      }
    })
  }

  onSubmit() {
    this.isSubmited = true
    if (this.createSkillForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Please fill out the form correctly"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("erreur lors de création")
    }

    const formValue = this.createSkillForm.value
    const formData = new FormData
    formData.append('name', formValue.name)
    formData.append('category_id', formValue.category_id)

    this.profileService.createSkills(formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Skill added successfully."
        this.toastType = 'success'

        setTimeout(() => {
          this.showToast = false
          this.router.navigate(['/blog-aYdXmXiBn/skills-list'])
        }, 2000)
        console.log("Skill added successfully.", response)
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
