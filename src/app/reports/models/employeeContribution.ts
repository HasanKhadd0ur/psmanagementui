import { PersonalInfo } from "../../employees/models/vakueObjects/personalInfo"
import { WorkInfo } from "../../employees/models/vakueObjects/workInfo"

export class EmployeeContribution {
    Email :string 
    hiastId :number 
    personalInof : PersonalInfo 
    workInof :WorkInfo
    contribution: number 
}