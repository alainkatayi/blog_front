import { Component } from '@angular/core';
import { Project } from '../../../core/models/project';
import { ProjectService } from '../../../core/services/project/project.service';
import { ProjectCardComponent } from "../../../components/project-card/project-card.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {
  projects!: Project[]
  constructor(private projectService: ProjectService) { }
  ngOnInit() {
    this.getProject()
  }
  getProject() {
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projects = response
        console.log("project", response)
      },
      error: (error) => {
        console.log("error", error)
      }
    })
  }
}
