import { Employee } from "../../../employees/models/responses/employee"
import { EmployeeWork } from "../valueObjects/EmployeeWork"
import { EmployeeWorkInfo } from "../valueObjects/EmployeeWorkInfo"
import { TrackInfo } from "../valueObjects/trackInfo"

export class EmployeeTrack {
    emloyeeId :number 
    trackId :number
    employee : Employee
    trackInfo :TrackInfo
    employeeWorkInfo : EmployeeWorkInfo
    employeeWork :EmployeeWork
    notes :string 
}