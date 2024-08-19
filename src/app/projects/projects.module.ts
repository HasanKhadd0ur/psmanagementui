import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import { ProjectService } from './services/project.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';



@NgModule({
  declarations: [
    ProjectItemComponent,
    AttachmentComponent,
    ProjectListComponent,
    ProjectDetailsComponent
  ],
  providers:[
    ProjectService
  ],
  exports:[
    ProjectRoutingModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class ProjectsModule { }
