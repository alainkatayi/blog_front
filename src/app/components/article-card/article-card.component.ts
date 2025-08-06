import { Component, Input, input } from '@angular/core';
import { Article} from '../../core/models/article';

@Component({
  selector: 'app-article-card',
  imports: [],
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css'
})
export class ArticleCardComponent {
  @Input() article!: Article
}
