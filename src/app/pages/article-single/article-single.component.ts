import { Component } from '@angular/core';
import { Article } from '../../core/models/article';
import { ArticleService } from '../../core/services/articles/article.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-article-single',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './article-single.component.html',
  styleUrl: './article-single.component.css'
})
export class ArticleSingleComponent {
  article!:Article
  articleId!:number

  constructor(private articleService:ArticleService,private route:ActivatedRoute){}

  ngOnInit(){
    this.articleId =+this.route.snapshot.paramMap.get('id')!
    this.getArticle()
  }

  getArticle():void{
    this.articleService.getArticle(this.articleId).subscribe({
      next:(response)=>{
        this.article = response
        console.log("unique article", response)
      },
      error:(error)=>{
        console.error(error)
      }
    })
  }
}
