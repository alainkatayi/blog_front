import { Component, Input, input } from '@angular/core';
import { Article} from '../../core/models/article';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environnement } from '../../../environnemnts/environnement';


@Component({
  selector: 'app-article-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  @Input() article!: Article
  url=environnement.Url
}
