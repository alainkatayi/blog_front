import { Component } from '@angular/core';
import { Article } from '../../core/models/article';
import { ArticleService } from '../../core/services/articles/article.service';
import { error } from 'console';
import { ArticleCardComponent } from "../../components/article-card/article-card.component";
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { start } from 'repl';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
import { Category } from '../../core/models/category';

@Component({
  selector: 'app-article-list',
  imports: [ArticleCardComponent, HeaderComponent, FooterComponent, CommonModule,ReactiveFormsModule],
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
  searchControl = new FormControl('')
  categoryControl = new FormControl(''); 
  categories!:Category[]

  constructor(private articleService: ArticleService) { }
  ngOnInit():void{
    this.searchControl.valueChanges.pipe(
      debounceTime(400),//evite les apppels API à chaque fois
      distinctUntilChanged(), //evite les doublons
    ).subscribe(
      search=>{
        this.getArticles(1,search || '')
      }
    )
    this.getArticles()
    this.getCategories()
  }

  getArticles(page: number = 1,search:string='',category__name:string=''): void {
    this.currentPage = page
    this.articleService.getArticles(page, this.pageSize,{search,category__name}).subscribe({
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
    this.getArticles(page,this.searchControl.value || '');
  }

  getArticleByCategory(category__name:string):void{
    this.getArticles(1,this.searchControl.value || '',category__name)
    console.log(category__name)
  }

  getCategories(){
    this.articleService.getCategories().subscribe({
      next:(response)=>{
        this.categories = response
        console.log("list des categories",response)
      },
      error:(error)=>{
        console.log("erreur", error)
      }
    })
  }

}
