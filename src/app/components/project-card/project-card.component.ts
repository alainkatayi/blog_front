import { Component, Input } from '@angular/core';
import { Project } from '../../core/models/project';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-project-card',
  imports: [NgIf],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css'
})
export class ProjectCardComponent {
  @Input() project!:Project

}
