import { EmployeeWork } from "../valueObjects/EmployeeWork";
import { EmployeeWorkInfo } from "../valueObjects/EmployeeWorkInfo";


export class UpdateEmployeeWorkTrackRequest {
    employeeTrackId: number;
    trackId: number;
    employeeId: number;
    employeeWorkInfo: EmployeeWorkInfo;
    employeeWork: EmployeeWork;
    notes: string;
}
