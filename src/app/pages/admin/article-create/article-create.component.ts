import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../../core/services/articles/article.service';
import { UserLocalService } from '../../../core/services/userLocal/user-local.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../../core/models/category';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-article-create',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './article-create.component.html',
  styleUrl: './article-create.component.css'
})
export class ArticleCreateComponent {
  createArticleForm!:FormGroup
  isSubmited = false
  showToast = false
  toastType:'success' | 'error' = 'success'
  toastMessage = ''
  errorMessage = ''
  successMessage = ''
  category!:Category[]
  private router = inject(Router)

  constructor(private articleService:ArticleService, private fb:FormBuilder, private userLocalService:UserLocalService){}

  ngOnInit(){
    this.getCategories()
    this.createArticleForm = this.fb.group({
      title: ['', Validators.required],
      introduction: ['', Validators.required],
      content: ['', Validators.required],
      category_id: ['',Validators.required]
    })

    console.log(this.userLocalService.getAuthHeaders())
  }

  getCategories(){
    this.articleService.getCategories().subscribe({
      next:(response)=>{
        this.category = response
        console.log("list des categories",response)
      },
      error:(error)=>{
        console.log("erreur", error)
      }
    })
  }

  onSubmit(){
    this.isSubmited = true

    if(this.createArticleForm.invalid){
      this.showToast = true
      this.toastType = 'error'
      this.toastMessage = "Please fill out the form correctly"
      setTimeout(()=>{
        this.showToast = false
      }, 2000)
      console.log("erreur lors de création")
    }

    const formValuer = this.createArticleForm.value
    const formData = new FormData

    formData.append('title',formValuer.title)
    formData.append('introduction',formValuer.introduction)
    formData.append('content',formValuer.content)
    formData.append('category_id',formValuer.category_id)

    this.articleService.createArticle(formData).subscribe({
      next:(response)=>{
        this.isSubmited = false
        this.showToast = true
        this.toastMessage= "Article created successfully"
        this.toastType = 'success'

        setTimeout(()=>{
          this.showToast = false
          this.router.navigate(['/blog-aYdXmXiBn/article-list'])
        },2000)
        console.log("article create", response)
      },

      error:(error) =>{
        this.isSubmited = false
        this.showToast = true
        this.toastMessage ="Please fill out the form correctly"
        this.toastType = 'error'
        console.log("error", error)
      }
    })
  }

}
