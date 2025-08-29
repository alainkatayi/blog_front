import { Component } from '@angular/core';
import { Article } from '../../../core/models/article';
import { ArticleService } from '../../../core/services/articles/article.service';
import { response } from 'express';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent {
  articles!:Article[]
  pageSize = 6
  currentPage = 1
  nextPageUrl:string | null = null
  prevPageUrl:string | null = null
  totalCount = 0
  articleId: number = -1;
  DeleteModalOpen = false;
  constructor(private articleService:ArticleService){}

  ngOnInit(){
    this.getArticles()
  }
  getArticles(page:number=1):void{
    this.articleService.getArticles(page, this.pageSize).subscribe({
      next:(response)=>{
        this.articles = response.results
        this.totalCount = response.count
        this.prevPageUrl = response.previous
        this.nextPageUrl = response.next
        this.currentPage = page
        console.log(response.results)
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }

  goToPage(page: number) {
    this.getArticles(page);
  }

  deleteArticle(){
    this.articleService.deleteArticle(this.articleId).subscribe({
      next:(response)=>{
        window.location.reload();
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  openDeleteModal(id:number) {
    this.DeleteModalOpen = true;
    this.articleId = id;
  }

  confirmDelete() {
    this.deleteArticle();
    this.closeDeleteModal();
  } 

  closeDeleteModal() {
    this.DeleteModalOpen = false;
  }
}
