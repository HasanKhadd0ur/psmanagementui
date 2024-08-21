import { Aggreement } from "../valueObjects/Aggreement"
import { FinancialFund } from "../valueObjects/FinancialFund"
import { ProjectInfo } from "../valueObjects/ProjectInfo"
import { ProposalInfo } from "../valueObjects/proposalInfo"

export class CreateProjectRequest {
    projectInfo :ProjectInfo 
    proposalInfo :ProposalInfo
    projectAggreement :Aggreement
    financialFund :FinancialFund
    teamLeaderId :number
    projectManagerId :number
    proposerId :number
    executerId :number
}