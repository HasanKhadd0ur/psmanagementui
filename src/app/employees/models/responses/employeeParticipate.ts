import { ProjectInfo } from "../../../projects/models/valueObjects/ProjectInfo"
import { Employee } from "./employee"

export class EmployeeParticipate {

    employeeId :number 
    projectId : number
    projectInfo: ProjectInfo
    employee :Employee
    partialTimeRatio : number 
    role: string   
}