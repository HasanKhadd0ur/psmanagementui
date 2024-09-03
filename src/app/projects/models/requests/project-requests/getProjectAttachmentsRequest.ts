export interface GetProjectAttachmentsRequest {
    projectId: number;
    pageNumber: number | null;
    pageSize: number | null;
}
export class  GetProjecByFilterRequest {
    projectName :string
    teamLeaderName : string 
    departmentName :string
    proposerName : string
         
   
}
