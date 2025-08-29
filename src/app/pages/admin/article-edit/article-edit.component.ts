import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../core/services/articles/article.service';
import { Category } from '../../../core/models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css'
})
export class ArticleEditComponent {
  editArticleForm!: FormGroup
  isSubmited = false
  showToast = false
  toastType: 'success' | 'error' = 'success'
  toastMessage = ''
  errorMessage = ''
  successMessage = ''
  category!: Category[]
  articleId!: number
  private router = inject(Router)

  constructor(private articleService: ArticleService, private fb: FormBuilder, private route: ActivatedRoute) { }

  loadDataArticle(): void {
    this.articleService.getArticle(this.articleId).subscribe({
      next: (response) => {
        this.editArticleForm.patchValue(response)
      },

      error: (error) => {
        console.log(error)
      }
    })
  }

  getCategories() {
    this.articleService.getCategories().subscribe({
      next: (response) => {
        this.category = response
        console.log("list des categories", response)
      },
      error: (error) => {
        console.log("erreur", error)
      }
    })
  }
  ngOnInit() {
    this.editArticleForm = this.fb.group({
      title: ['', Validators.required],
      introduction: ['', Validators.required],
      content: ['', Validators.required],
      category_id: ['', Validators.required]
    })
    this.articleId = +this.route.snapshot.paramMap.get('id')!
    console.log(this.articleId)
    this.loadDataArticle()
    this.getCategories()
  }

  onSubmit() {
    this.isSubmited = true
    if (this.editArticleForm.invalid) {
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Veuillez remplir correctement le formulaire"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("erreur lors de la modification")
    }

    const formValuer = this.editArticleForm.value
    const formData = new FormData

    formData.append('title', formValuer.title)
    formData.append('introduction', formValuer.introduction)
    formData.append('content', formValuer.content)
    formData.append('category_id', formValuer.category_id)

    this.articleService.editArticle(this.articleId, formData).subscribe({
      next: (response) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Article modifié avec success"
        this.toastType = 'success'

        setTimeout(() => {
          this.showToast = false
          this.router.navigate(['/blog-aYdXmXiBn/article-list'])
        }, 2000)
        console.log("article create", response)
      },

      error: (error) => {
        this.isSubmited = false
        this.showToast = true
        this.toastMessage = "Veuillez remplir correctement le formulaire"
        this.toastType = 'error'
        console.log("erreur de modification", error)
      }
    })

  }
}
