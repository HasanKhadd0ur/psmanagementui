import { StepInfo } from "../valueObjects/StepInfo";

export class Step {
    id: number;
    stepInfo: StepInfo;
    currentCompletionRatio: number;
    weight: number;
    projectId: number;
}
