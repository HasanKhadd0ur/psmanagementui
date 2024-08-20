import { Availability } from "../vakueObjects/Availability"
import { PersonalInfo } from "../vakueObjects/personalInfo"
import { WorkInfo } from "../vakueObjects/WorkInfo"

export class Employee {
    id:number
    hiastId :number
    userId :number
    departmentName :string
    personalInfo :PersonalInfo
    availability :Availability
    workInfo : WorkInfo 
    
}