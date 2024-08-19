import { FinancialFund } from "../valueObjects/FinancialFund"
import { ProjectInfo } from "../valueObjects/ProjectInfo"
import { ProposalInfo } from "../valueObjects/proposalInfo"

export class Project
{
    id:number
    proposalInfo : ProposalInfo 
    projectInfo :ProjectInfo
    currentState: any
    projectAggreement :any
    teamLeaderId: number
    teamLeader :any
    projectManagerId:number
    executer:any
    proposerId:any
    steps :any
    financialFund:FinancialFund
    
    
}
