import { CertificationCreateComponent } from './pages/admin/certification-create/certification-create.component';
import { SkillCreateComponent } from './pages/admin/skill-create/skill-create.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

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
        path:'article-single/:id',
        title:'Article',
        loadComponent: () =>
            import('../app/pages/article-single/article-single.component').then((m) => m.ArticleSingleComponent),
    },
    {
        path:'about',
        title:'about',
        loadComponent: () =>
            import('../app/pages/about/about.component').then((m) => m.AboutComponent),
    },
    {
        path:'login',
        title:'login',
        loadComponent: () =>
            import('../app/pages/login/login.component').then((m) => m.LoginComponent),
    }
    ,
    {
        path:'blog-aYdXmXiBn/dashboard',
        title:'admin',
        loadComponent: () =>
            import('../app/pages/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    }
    ,
    {
        path:'blog-aYdXmXiBn/article-list',
        title:'admin',
        loadComponent: () =>
            import('../app/pages/admin/article-list/article-list.component').then((m) => m.ArticleListComponent),
    }
    ,
    {
        path:'blog-aYdXmXiBn/certification-list',
        title:'admin',
        loadComponent: () =>
            import('../app/pages/admin/certification-list/certification-list.component').then((m) => m.CertificationListComponent ),
    }
    ,
    {
        path:'blog-aYdXmXiBn/certification-create',
        title:'admin',
        loadComponent: () =>
            import('../app/pages/admin/certification-create/certification-create.component').then((m) => m.CertificationCreateComponent ),
    }
    ,
    {
        path:'blog-aYdXmXiBn/create',
        title:'admin',
        loadComponent: () =>
            import('../app/pages/admin/article-create/article-create.component').then((m) => m.ArticleCreateComponent ),
    }

    ,
    {
        path:'blog-aYdXmXiBn/skills-list',
        title:'admin',
        loadComponent: () =>
            import('../app/pages/admin/skills-list/skills-list.component').then((m) => m.SkillsListComponent ),
    }
        ,
    {
        path:'blog-aYdXmXiBn/skills-create',
        title:'admin',
        loadComponent: () =>
            import('../app/pages/admin/skill-create/skill-create.component').then((m) => m.SkillCreateComponent ),
    }

    ,
    {
        path:'blog-aYdXmXiBn/edit/:id',
        title:'admin',
        loadComponent: () =>
            import('../app/pages/admin/article-edit/article-edit.component').then((m) => m.ArticleEditComponent ),
    }
    ,
    {
        path:'blog-aYdXmXiBn/experience-list',
        title:'admin',
        loadComponent: () =>
            import('../app/pages/admin/experience-list/experience-list.component').then((m) => m.ExperienceListComponent),
    }
            ,
    {
        path:'blog-aYdXmXiBn/experience-create',
        title:'admin',
        loadComponent: () =>
            import('../app/pages/admin/experience-create/experience-create.component').then((m) => m.ExperienceCreateComponent),
    }
    ,
    {
        path:'contact',
        title:'contact',
        loadComponent: () =>
            import('../app/pages/contact/contact.component').then((m) => m.ContactComponent),
    }
    ,
    {
        path:'project',
        title:'project',
        loadComponent: () =>
            import('../app/pages/project-list/project-list.component').then((m) => m.ProjectListComponent),
    }
    ,
    {
        path:'blog-aYdXmXiBn/project-list',
        title:'project',
        loadComponent: () =>
            import('../app/pages/admin/project-list/project-list.component').then((m) => m.ProjectListComponent),
    }

];
