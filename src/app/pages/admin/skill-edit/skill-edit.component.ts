import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../core/models/category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfileService } from '../../../core/services/profiles/profile.service';
import { ArticleService } from '../../../core/services/articles/article.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-skill-edit',
  imports: [CommonModule,ReactiveFormsModule, RouterLink],
  templateUrl: './skill-edit.component.html',
  styleUrl: './skill-edit.component.css'
})
export class SkillEditComponent {
  editSkillForm!: FormGroup
  isSubmited = false
  showToast = false
  toastType: 'success' | 'error' = 'success'
  toastMessage = ''
  errorMessage = ''
  successMessage = ''
  category!: Category[]
  skillId!: number
  private router = inject(Router)

  constructor(private profileService: ProfileService, private fb: FormBuilder, private route: ActivatedRoute, private articleService: ArticleService) { }

  loadSkillData(): void {
    this.profileService.getSkill(this.skillId).subscribe({
      next: (response) => {
        this.editSkillForm.patchValue(response)
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
    this.editSkillForm = this.fb.group({
      name: ['', Validators.required],
      category_id: ['', Validators.required],
    })

    this.skillId = +this.route.snapshot.paramMap.get('id')!
    this.loadSkillData()
    this.getCategories()
  }

  onSubmit() {
    this.isSubmited = true
    if (this.editSkillForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Please fill out the form correctly"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("error")

    }

    const formValue = this.editSkillForm.value
    const formData = new FormData

    formData.append('name', formValue.name)
    formData.append('category_id', formValue.category_id)

    this.profileService.editSkill(this.skillId, formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Skill edited successfully"
        this.toastType = 'success'

        setTimeout(() => {
          this.showToast = false
          this.router.navigate(['/blog-aYdXmXiBn/skills-list'])
        }, 2000)
        console.log("skill update", response)
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
