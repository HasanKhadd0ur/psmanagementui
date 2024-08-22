import { StepInfo } from "../../valueObjects/StepInfo";



export class AddProjectStepRequest {
    projectId: number;
    stepInfo: StepInfo;
    currentCompletionRatio: number;
    weight: number;
}
