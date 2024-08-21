import { Availability } from "../vakueObjects/availability"
import { PersonalInfo } from "../vakueObjects/personalInfo"
import { WorkInfo } from "../vakueObjects/workInfo"

export class Employee {
    id:number
    hiastId :number
    userId :number
    email : string
    departmentName :string
    personalInfo :PersonalInfo
    availability :Availability
    workInfo : WorkInfo 
    
}