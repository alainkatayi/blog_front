import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { AboutComponent } from './pages/about/about.component';
import { ArticleListComponent } from './pages/article-list/article-list.component';

export const routes: Routes = [
    {
        path:'',
        title:'Home',
        component:HomeComponent
    },
    {
        path:'article-list',
        title:'Article',
        loadComponent: () =>
            import('../app/pages/article-list/article-list.component').then((m) => m.ArticleListComponent),
    },
    {
        path:'about',
        title:'about',
        loadComponent: () =>
            import('../app/pages/about/about.component').then((m) => m.AboutComponent),
    }

];
