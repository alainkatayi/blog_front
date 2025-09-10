import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../core/services/articles/article.service';
import { Category } from '../../../core/models/category';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-article-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterLink,CKEditorModule],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css'
})
export class ArticleEditComponent {
  editArticleForm!: FormGroup
  Editor :any; // L’éditeur CKEditor
  public editorConfig = {
  toolbar: [
    'heading', '|',
    'bold', 'italic','underline', 'strikethrough', 'subscript', 'superscript', '|',
    'link', 'blockQuote', 'code', 'codeBlock', '|',
    'bulletedList', 'numberedList', 'todoList', '|',
    'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells', '|',
    'horizontalLine', '|',
    'undo', 'redo', '|',
  ]
};
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
        console.log(" categories", response)
      },
      error: (error) => {
        console.log("error", error)
      }
    })
  }
  async ngOnInit() {
    this.editArticleForm = this.fb.group({
      title: ['', Validators.required],
      introduction: ['', Validators.required],
      content: ['', Validators.required],
      category_id: ['', Validators.required],
      image:['',Validators.required]
    })
    if (typeof window !== 'undefined') {
      // ✅ Import dynamique uniquement côté navigateur
      const ClassicEditor = (await import('@ckeditor/ckeditor5-build-classic')).default;
      this.Editor = ClassicEditor;
    }
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
      this.toastMessage = "Please fill out the form correctly"
      setTimeout(() => {
        this.showToast = false
      }, 2000)
      console.log("error")
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
        this.toastMessage = "Article edited successfully"
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
        this.toastMessage = "Please fill out the form correctly"
        this.toastType = 'error'
        console.log("error", error)
      }
    })

  }
}
