import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsTypesRoutingModule } from './routing/projects-types-routing.module';
import { TypeItemComponent } from './components/type-item/type-item.component';
import { TypesListComponent } from './pages/types-list/types-list.component';
import { TypesCreateComponent } from './pages/types-create/types-create.component';
import { EditTypeModalComponent } from './components/edit-type-modal/edit-type-modal.component';
import { FormsModule } from '@angular/forms';
import { TypesDetailComponent } from './pages/types-detail/types-detail.component';
import { RemoveTyoeModalComponent } from './components/remove-tyoe-modal/remove-tyoe-modal.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TypeItemComponent,
    TypesListComponent,
    TypesCreateComponent,
    EditTypeModalComponent,
    TypesDetailComponent,
    RemoveTyoeModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ProjectsTypesRoutingModule
  ]
})
export class ProjectsTypesModule { }
