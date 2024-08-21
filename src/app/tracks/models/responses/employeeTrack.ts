import { EmployeeWork } from "../valueObjects/EmployeeWork"
import { EmployeeWorkInfo } from "../valueObjects/EmployeeWorkInfo"
import { TrackInfo } from "../valueObjects/trackInfo"

export class EmployeeTrack {
    emloyeeId :number 
    trackId :number
    rrackInfo :TrackInfo
    employeeWorkInfo : EmployeeWorkInfo
    employeeWork :EmployeeWork
    notes :string 
}