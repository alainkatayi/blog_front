import { response } from 'express';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../core/models/category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProjectService } from '../../../core/services/project/project.service';
import { ArticleService } from '../../../core/services/articles/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-edit',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})
export class ProjectEditComponent {
  editProjectForm!: FormGroup
  isSubmited = false
  showToast = false
  toastType: 'success' | 'error' = 'success'
  toastMessage = ''
  errorMessage = ''
  successMessage = ''
  category!: Category[]
  projectId!: number

  private router = inject(Router)

  constructor(private projectService: ProjectService, private categoryService: ArticleService, private fb: FormBuilder, private route: ActivatedRoute) { }

  loadSkillData(): void {
    this.projectService.getProject(this.projectId).subscribe({
      next: (response) => {
        this.editProjectForm.patchValue(response)
      }
    })
  }
  ngOnInit() {
    this.getCategories()
    this.editProjectForm = this.fb.group({
      category_id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      created_at: ['', Validators.required],
      status: [Boolean],
      technology: this.fb.array([])
    })
    this.projectId = + this.route.snapshot.paramMap.get('id')!
    this.loadSkillData()
  }

  get skills(): FormArray {
    return this.editProjectForm.get('technology') as FormArray
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
    if (this.editProjectForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Please fill out the form correctly"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("error")
    }

    const formValue = this.editProjectForm.value
    const formData = new FormData

    formData.append('technology', JSON.stringify(this.editProjectForm.value.technology));
    formData.append('category_id', formValue.category_id)
    formData.append('name', formValue.name)
    formData.append('description', formValue.description)
    formData.append('created_at', formValue.created_at)
    formData.append('status', formValue.status)

    this.projectService.editProject(this.projectId, formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Project edit successfully"
        this.toastType = 'success'

        setTimeout(() => {
          this.showToast = false
          this.router.navigate(['/blog-aYdXmXiBn/project-list'])
        }, 2000)
        console.log("project update", response)
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
