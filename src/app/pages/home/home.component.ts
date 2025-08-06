import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { ArticleService } from '../../core/services/articles/article.service';
import { Article} from '../../core/models/article';
import { ArticleCardComponent } from "../../components/article-card/article-card.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, ArticleCardComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  articles!:Article[]
  erroMessage :string = ''
  constructor(private articleService: ArticleService){}

  ngOnInit(){
    this.getArticles()
  }

  //function pour la récupération des articles depuis le service article
  getArticles(){
    this.articleService.getArticles().subscribe({
      next:(response)=>{
        //debug
        console.log("artilces récuperé", response)
        this.articles = response.results
      },

      //cas d'erreur
      error:(error)=>{
        //debug
        console.error("erreur lors de la récupération des articles", error)
        this.erroMessage = error
      }
    })
  }

}
