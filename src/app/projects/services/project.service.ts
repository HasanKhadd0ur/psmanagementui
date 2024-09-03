//#region Imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { Project } from '../models/responses/project';
import { Result } from '../../core/models/result';
import { Observable } from 'rxjs';
import { GetProjectsByProjectManagerRequest, GetProjectsByTeamLeaderRequest } from '../models/requests/project-requests/GetProjectsByProjectManagerRequest';
import { EmployeeParticipate } from '../../employees/models/responses/employeeParticipate';
import { ChangeProjectTeamLeaderRequest } from '../models/requests/project-requests/ChangeProjectTeamLeaderRequest';
import { ChangeProjectManagerRequest } from '../models/requests/project-requests/ChangeProjectManagerRequest';
import { AddProjectStepRequest } from '../models/requests/project-requests/AddProjectStepRequest';
import { RemoveParticipantRequest } from '../models/requests/project-requests/RemoveParticipant';
import { AddParticipantRequest } from '../models/requests/project-requests/addParticipantRequest';
import { CancelProjectRequest } from '../models/requests/project-requests/CancelProjectRequest';
import { RePlanProjectRequest } from '../models/requests/project-requests/RePlanProjectRequest';
import { CreateProjectRequest } from '../models/requests/project-requests/createProjectRequest';
import { AddAttachmentRequest } from '../models/requests/project-requests/AddAttachmentRequest';
import { Attachment, AttachmentFile } from '../models/responses/attachment';
import { CompleteProjectRequest } from '../models/requests/project-requests/completeProjectRequest';
import { ChangeEmployeeParticipationRequest } from '../models/requests/project-requests/ChangeEmployeeParticipationRequest';
import { ParticipationChange } from '../models/responses/participationChange';
import { ProjectCompletion } from '../models/responses/ProjectCompletion';
import { EmployeeContribution } from '../models/responses/employeeContribution';
import { GetProjecByFilterRequest } from '../models/requests/project-requests/getProjectAttachmentsRequest';
//#endregion Imports
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http :HttpClient ,private config : ConfigurationService) { }
  
 //#region  queries
 
 // the filters options are 
  // -- department name 
  // -- first name 
  // -- project manager 
  // -- team leader 
  // -- 
  public getByFilter():Observable<Project[]>{

    return this.http.get<Project[]>(this.config.getServerUrl()+ "/Projects/ByFilter");
  
  }

  public getByRequestFilter(request : GetProjecByFilterRequest):Observable<Project[]>{

    return this.http.get<Project[]>(this.config.getServerUrl()+ "/Projects/ByFilter",{params:{...request}});
  
  }
  
  public getParticipationChangeHistory(projectId :number ):Observable<ParticipationChange[]>{

    return this
    .http
    .get<ParticipationChange[]>(this.config.getServerUrl()+'/Projects/ParticipationChangeHistory/'+projectId)
  }

  public getAll(pageSize : number | null , pageNumber :number |null):Observable<Project[]>{

    let pagination= this.getPagination(pageSize,pageNumber);

    return this.http.get<Project[]>(this.config.getServerUrl()+ "/Projects"+pagination);
  
  }

  // this method reponsible for geting the specificed projet by its id 
  // 
  public getProjectById(id : number ):Observable<Project>{
    
    return this.http.get<Project>(this.config.getServerUrl()+ "/Projects/"+id);
  }

  public getProjectCompletion(projectId : number ):Observable<ProjectCompletion>{
    
    return this.http.get<ProjectCompletion>(this.config.getServerUrl()+ "/Projects/Completion/"+projectId);
  }

  
  // this method retreive  the projects by its manager 
  public getByProjectManger(request : GetProjectsByProjectManagerRequest ):Observable<Project[]>{
    
    let pagination =this.getPagination(request.pageSize,request.pageNumber);
    return this
              .http
              .get<Project[]>(`${this.config.getServerUrl()}/Projects/ByProjectManager/?projectManagerId=${request.projectMangerId}${pagination}`);
  }
  // this method retreive  the projects by its manager 
  public getByTeamLeader(request : GetProjectsByTeamLeaderRequest ):Observable<Project[]>{
    
    let pagination =this.getPagination(request.pageSize,request.pageNumber);
    return this
              .http
              .get<Project[]>(`${this.config.getServerUrl()}/Projects/ByFilter/?teamLeaderId=${request.teamLeaderrId}${pagination}`);
  }
  
  public getCompletionContribution(projectId : number  ):Observable<EmployeeContribution[]>{
    
    return this
              .http
              .get<EmployeeContribution[]>(`${this.config.getServerUrl()}/Projects/CompletionContributions/${projectId}`);
  }
  

  

  //#endregion  queries



  
  //#region  planning  managment
  
  //tihs method responsible for hanging the team leader 
  //
  public changeTeamLeader(request  : ChangeProjectTeamLeaderRequest ):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Projects/ChangeProjectTeamLeader",request);

  }

  
  //tihs method responsible for changing the project manager
  //
  public changeProjectManager(request  : ChangeProjectManagerRequest ):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Projects/ChangeProjectManager",request);

  }

  //tihs method responsible for add a new step to the project
  //
  public addStepToProject(request  : AddProjectStepRequest ):Observable<number>{
    
    return this.http.post<number>(this.config.getServerUrl()+ "/Projects/AddProjectStep",request);

  }
  //#endregion  planning  managment


  //#region  participants managment 
  
  
  
  // this method responsible for get the participants of a project
  // 
  public getParticipants(projectId : number ):Observable<EmployeeParticipate[]>{
    
    return this.http.get<EmployeeParticipate[]>(this.config.getServerUrl()+ "/Projects/GetParticipants/"+projectId);
  }
  //tihs method responsible for remove a participant of the project  
  //
  public removeParticipant(request  : RemoveParticipantRequest ):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Projects/RemoveParticipant",request);

  }
  public changeParticipation(request  : ChangeEmployeeParticipationRequest ):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Projects/ChangeParticipation",request);

  }
  //tihs method responsible for adda new participant to the project
  //
  public addParticipant(request  : AddParticipantRequest ):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Projects/AddParticipant",request);

  }
  //#endregion  participants managment   
 
 
  //#region  state management 

  //tihs method responsible for change the state of the project from in plan to in progresss
  //
  public approveProject(projectId : number  ):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Projects/ApproveProject",{projectId});

  }

  //tihs method responsible for cancel the project  
  //
  public cancelProject(request  : CancelProjectRequest ):Observable<void>{
    
    return this.http.post<void>(`${this.config.getServerUrl()}/Projects/CancelProject/${request.projectId}`,request);

  }
  
  //tihs method responsible for changing the state of the project from in progress to in plan
  //
  public rePlanProject(request  : RePlanProjectRequest ):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Projects/RePlanProject",request);

  }

  //tihs method responsible for changing the state of the project to completed
  //
  public completeProject(request : CompleteProjectRequest  ):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Projects/CompleteProject/",request);

  }

  //tihs method responsible for creating a new project 
  //
  public createProject(request  : CreateProjectRequest ):Observable<Project>{
    
    return this.http.post<Project>(this.config.getServerUrl()+ "/Projects/",request);

  }
//#endregion state management


  //#region  attachments 

  //tihs method responsible for adding an atachment to the project  
  //
  public addAttachment(request  : AddAttachmentRequest ):Observable<number>{
    
    const formData = new FormData();
    formData.append('projectId', request.projectId.toString());
    formData.append('attachmentName', request.attachmentName);
    formData.append('attachmentDescription', request.attachmentDescription);
    
    if (request.file) {
      formData.append('file', request.file);
    }
    return this.http.post<number>(this.config.getServerUrl()+ "/Projects/AddAttachment",formData);

  }

  public getAttacmenfFile(attachmentId :number,url :string ):Observable<File>{

    return this.http.get<File>(`${this.config.getServerUrl()}/Projects/Attachment/`, {
      params: { attachmentId: attachmentId.toString(), fileUrl: url },
      responseType: 'blob' as 'json'  // Specify responseType as 'blob'
    });
  


  }
  //tihs method responsible for getting the attachments  of a project 
  //
  public getAttachment(projectId : number  ):Observable<Attachment[]>{
    
    return this.http.get<Attachment[]>(this.config.getServerUrl()+ "/Projects/Attachments/?projectId="+projectId);

  }
  public removeAttachment(projectId : number ,attachmentId : number  ):Observable<void>{
    
    return this.http.post<void>(this.config.getServerUrl()+ "/Projects/RemoveAttachment/",{
      'projectId':projectId,
      'attachmentId':attachmentId

    });

  }

  //#endregion attachments


  //#region  pagination convert 
 private getPagination( pageSize:number | null , pageNumber : number |null ){

      if(pageNumber == null || pageSize == null){
        return "";
      }
      else {

        return `&pageSize=${pageSize}&PageNumber=${pageNumber}`;

      }


    }
  //#endregion pagination convert
}
