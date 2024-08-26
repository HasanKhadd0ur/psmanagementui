import { Customer } from "../../../customers/models/customer"
import { Employee } from "../../../employees/models/responses/employee"
import { EmployeeParticipate } from "../../../employees/models/responses/employeeParticipate"
import { Aggreement } from "../valueObjects/Aggreement"
import { FinancialFund } from "../valueObjects/FinancialFund"
import { ProjectInfo } from "../valueObjects/ProjectInfo"
import { ProposalInfo } from "../valueObjects/proposalInfo"
import { ProjectClassification } from "../valueObjects/ProjectClassification"
import { Department } from "./department"
import { Step } from "./Step"
import { FinancialSpending } from "./financialSpending"
import { ProjectType } from "../../../projects-types/models/responses/projectType"
export class Project
{
    id:number
    proposalInfo : ProposalInfo 
    projectInfo :ProjectInfo
    currentState: string
    projectClassification :ProjectClassification
    projectAggreement :Aggreement
    teamLeaderId: number
    teamLeader :Employee
    projectManagerId:number
    projectManager: Employee
    executer:Department
    proposerId:number
    proposer:Customer
    projectType : ProjectType
    projectTypeId :number 
    steps :Step[]
    financialSpending : FinancialSpending[]
    employeeParticipates:EmployeeParticipate[]
    financialFund:FinancialFund
}

