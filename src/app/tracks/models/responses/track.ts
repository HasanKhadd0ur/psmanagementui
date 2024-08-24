import { ProjectInfo } from "../../../projects/models/valueObjects/ProjectInfo"
import { TrackInfo } from "../valueObjects/trackInfo"

export class Track {
    id  :number 
    trackInfo  :TrackInfo
    notes  : string 
    projectId  :number 
    projectInfo : ProjectInfo
}
