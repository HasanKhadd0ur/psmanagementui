import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { ConfigurationService } from '../../core/services/configuration/configuration.service';
import { Observable } from 'rxjs';
import { Step } from '../models/responses/Step';
import { ChangeStepWeightRequest } from '../models/requests/step-requests/changeStepWeightRequest';
import { GetStepTrackHistoryRequest } from '../models/requests/step-requests/GetStepTrackHistoryRequest';
import { StepTrack } from '../../tracks/models/responses/steptrack';
import { UpdateCompletionRatioRequest } from '../models/requests/step-requests/UpdateCompletionRatioRequest';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private http :HttpClient ,private config : ConfigurationService) { }
 
  // this method responsible for get a specificef step
  // 
  public getStepById(stepId : number ):Observable<Step>{
    
    return this.http.get<Step>(this.config.getServerUrl()+ "/Steps/"+stepId);
  }

  // this method responsible for get the steps of a specified project
  // 
  public getStepsByProject(projectId : number ):Observable<Step[]>{
    
    return this.http.get<Step[]>(this.config.getServerUrl()+ "/Steps/ByProject/?projectId="+projectId);
  }

  // this method responsible for change the step weight of a step
  // 
  public changeStepWeight(request : ChangeStepWeightRequest ):Observable<void>{
    
    return this.http.put<void>(this.config.getServerUrl()+ "/Steps/ChangeStepWeight/"+request.stepId, request);
  }

  // this method responsible for get a step track history
  // 
  public getStepTrackHistory(request : GetStepTrackHistoryRequest ):Observable<StepTrack[]>{
    let pagination = this.getPagination(request.pageSize,request.pageNumber);
    return this.http.get<StepTrack[]>(`${this.config.getServerUrl()}/Steps/StepTrackHistory/?stepId=${request.stepId}${pagination}`);
  }

  // this method responsible for update the step completion ratio
  // 
  public changeCompletionRatio(request : UpdateCompletionRatioRequest ):Observable<void>{
    return this.http.put<void>(`${this.config.getServerUrl()}/Steps/ChangeCompletionRatio/?stepId=${request.stepId}`,request);
  }
  
  // this method responsible for delet the step
  // 
  public deleteSep(stepId : number  ):Observable<void>{
    return this.http.delete<void>(`${this.config.getServerUrl()}/Steps/${stepId}`);
  }

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
