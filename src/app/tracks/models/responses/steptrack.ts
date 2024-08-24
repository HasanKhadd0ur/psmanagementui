import { StepInfo } from "../../../projects/models/valueObjects/StepInfo"
import { TrackInfo } from "../valueObjects/trackInfo"

export class StepTrack {
    id :number 
    stepId :number 
    trackId  :number 
    stepInfo  :StepInfo
    trackInfo :TrackInfo
    executionState :string 
    trackExecutionRatio :number 
    oldExecutionRatio : number 

}