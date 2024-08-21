import { Customer } from "../../../customers/models/customer"
import { Employee } from "../../../employees/models/responses/employee"
import { EmployeeParticipate } from "../../../employees/models/responses/employeeParticipate"
import { Aggreement } from "../valueObjects/Aggreement"
import { FinancialFund } from "../valueObjects/FinancialFund"
import { ProjectInfo } from "../valueObjects/ProjectInfo"
import { ProposalInfo } from "../valueObjects/proposalInfo"
import { Step } from "./Step"

export class Project
{
    id:number
    proposalInfo : ProposalInfo 
    projectInfo :ProjectInfo
    currentState: string
    projectAggreement :Aggreement
    teamLeaderId: number
    teamLeader :Employee
    projectManagerId:number
    projectManager: Employee
    executer: {
        name :string
    }
    proposerId:number
    proposer:Customer
    steps :Step[]
    employeeParticipates:EmployeeParticipate[]
    financialFund:FinancialFund
}
