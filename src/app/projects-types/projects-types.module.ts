import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsTypesRoutingModule } from './routing/projects-types-routing.module';
import { TypeItemComponent } from './components/type-item/type-item.component';
import { TypesListComponent } from './pages/types-list/types-list.component';
import { TypesCreateComponent } from './pages/types-create/types-create.component';
import { EditTypeModalComponent } from './components/edit-type-modal/edit-type-modal.component';
import { FormsModule } from '@angular/forms';
import { TypesDetailComponent } from './pages/types-detail/types-detail.component';


@NgModule({
  declarations: [
    TypeItemComponent,
    TypesListComponent,
    TypesCreateComponent,
    EditTypeModalComponent,
    TypesDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProjectsTypesRoutingModule
  ]
})
export class ProjectsTypesModule { }
