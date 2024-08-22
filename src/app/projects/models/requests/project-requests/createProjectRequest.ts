import { Aggreement } from "../valueObjects/Aggreement"
import { FinancialFund } from "../valueObjects/FinancialFund"
import { ProjectClassification } from "../valueObjects/ProjectClassification"
import { ProjectInfo } from "../valueObjects/ProjectInfo"
import { ProposalInfo } from "../valueObjects/proposalInfo"

export class CreateProjectRequest {
    projectInfo :ProjectInfo 
    proposalInfo :ProposalInfo
    projectAggreement :Aggreement
    financialFund :FinancialFund
    projectClassification :ProjectClassification
    teamLeaderId :number
    projectManagerId :number
    proposerId :number
    executerId :number

    constructor(){
        
        this.projectAggreement= {
            aggreementDate :new Date(),
            aggreementNumber:0
        }
        this.financialFund= {
            source:'',
            financialStatus :''
        };

        this.projectClassification = {
            projectNature :'',
            projectStatus:'',
            projectType:''
        }
        this.projectInfo ={
            name :'',
            description:'',
            code :'',
            startDate : new Date(),
            expectedEndDate :new Date ()
        }
        this.proposalInfo ={
            proposingBookDate: new Date(),
            proposingBookNumber:0 
        }

    }
}