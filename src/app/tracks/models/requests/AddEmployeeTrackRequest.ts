import { EmployeeWork } from "../valueObjects/EmployeeWork";
import { EmployeeWorkInfo } from "../valueObjects/EmployeeWorkInfo";


export class AddEmployeeTrackRequest {
    trackId: number;
    employeeId: number;
    employeeWorkInfo: EmployeeWorkInfo;
    employeeWork: EmployeeWork;
    notes: string;
    projectId: number;
}
