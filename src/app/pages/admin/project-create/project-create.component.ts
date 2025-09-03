import { Skills } from './../../../core/models/profile';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../core/models/category';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../core/services/project/project.service';
import { ArticleService } from '../../../core/services/articles/article.service';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-project-create',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  createProjectForm!: FormGroup
  isSubmited = false
  showToast = false
  toastType: 'success' | 'error' = 'success'
  toastMessage = ''
  errorMessage = ''
  successMessage = ''
  category!: Category[]

  private router = inject(Router)

  constructor(private projectService: ProjectService, private categoryService: ArticleService, private fb: FormBuilder) { }
  ngOnInit() {
    this.getCategories()
    this.createProjectForm = this.fb.group({
      category_id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      created_at: ['', Validators.required],
      status: [Boolean],
      skills: this.fb.array([])
    })
  }

  get skills(): FormArray {
    return this.createProjectForm.get('skills') as FormArray
  }

  addSkill(skillName: string) {
    if (skillName) {
      this.skills.push(this.fb.control(skillName, Validators.required))
    }
  }

  removeSkill(index: number) { 
    this.skills.removeAt(index)
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.category = response
        console.log("list categories", response)
      },
      error: (error) => {
        console.log("erreur", error)
      }
    })
  }
  onSubmit() {
    this.isSubmited = true
    if (this.createProjectForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Please fill out the form correctly"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("error")
    }

    const formValuer = this.createProjectForm.value
    const formData = new FormData

    formData.append('category_id', formValuer.category_id)
    formData.append('name', formValuer.name)
    formData.append('description', formValuer.description)
    formData.append('created_at', formValuer.created_at)
    formData.append('status', formValuer.status)

    this.projectService.createProject(formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Project created successfully"
        this.toastType = 'success'

        setTimeout(() => {
          this.showToast = false
          this.router.navigate(['/blog-aYdXmXiBn/project-list'])
        }, 2000)
        console.log("article create", response)
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
