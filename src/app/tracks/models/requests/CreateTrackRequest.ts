import { TrackInfo } from "../valueObjects/trackInfo";

export class CreateTrackRequest {
    trackInfo: TrackInfo;
    notes: string;
    projectId: number;
}

