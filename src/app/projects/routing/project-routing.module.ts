import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialSpendingComponent } from '../pages/financial-spending/financial-spending.component';
import { ParticipantChangesComponent } from '../pages/participant-changes/participant-changes.component';
import { ParticipantsListComponent } from '../pages/participants-list/participants-list.component';
import { ProjectAttachmentsComponent } from '../pages/project-attachments/project-attachments.component';
import { ProjectCreateComponent } from '../pages/project-create/project-create.component';
import { ProjectDetailsComponent } from '../pages/project-details/project-details.component';
import { ProjectListComponent } from '../pages/project-list/project-list.component';
import { StepListComponent } from '../pages/step-list/step-list.component';
import { RoleGuard } from '../../core/guards/role.guard';
import { ROLES } from '../../core/constants/roles';
import { ProjectBycreterionComponent } from '../pages/project-bycreterion/project-bycreterion.component';


const routes: Routes = [
  {path:'',component :ProjectListComponent,canActivate:[RoleGuard] ,  data: { roles: [ROLES.SCIENTIFIC_DEPUTY] }},
  { path: 'detail/:id', component: ProjectDetailsComponent },
  { path: 'create', component: ProjectCreateComponent ,canActivate:[RoleGuard] ,  data: { roles: [ROLES.SCIENTIFIC_DEPUTY] }},
  { path: ':id/steps', component: StepListComponent },
  { path: ':id/participants', component: ParticipantsListComponent },
  { path: ':id/spending', component: FinancialSpendingComponent },
  { path: ':id/history/participationChange/:participantId',component:ParticipantChangesComponent},
  { path: ':id/attachments',component:ProjectAttachmentsComponent},
  { path: 'byCriterion',component:ProjectBycreterionComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
