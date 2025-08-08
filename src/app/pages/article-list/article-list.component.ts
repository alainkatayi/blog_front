import { Component } from '@angular/core';
import { Article } from '../../core/models/article';
import { ArticleService } from '../../core/services/articles/article.service';
import { error } from 'console';
import { ArticleCardComponent } from "../../components/article-card/article-card.component";
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list',
  imports: [ArticleCardComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent {
  articles!: Article[]
  errorMessage: string = '';
  pageSize = 6;
  currentPage = 1;
  nextPageUrl: string | null = null;
  prevPageUrl: string | null = null;
  totalCount = 0;
  isLoading = true;

  constructor(private articleService: ArticleService) { }
  ngOnInit() {
    this.getArticles()
  }

  getArticles(page: number = 1): void {
    this.currentPage = page
    this.articleService.getArticles(page, this.pageSize).subscribe({
      next: (response) => {
        //debug
        console.log("Article récupéré", response.results)
        this.articles = response.results
        this.totalCount = response.count
        this.nextPageUrl = response.next
        console.log("next Page", this.nextPageUrl)
        this.prevPageUrl = response.previous
        this.currentPage = page
        console.log("current page", this.currentPage)

      },
      error: (error) => {
        //debug
        console.error("Erreur lors de la récupération des annonces", error)
        this.errorMessage = error
      }
    })
  }

  goToPage(page: number) {
    this.getArticles(page);
  }

}
