import { CreateChimeMeetingResponse } from "./dto/CreateChimeMeetingResponse";
import { CreateChimeMeetingRequest } from "./dto/CreateChimeMeetingRequest";
import { JoinChimeMeetingRequest } from "./dto/JoinChimeMeetingRequest";
import { JoinChimeMeetingResponse } from "./dto/JoinChimeMeetingResponse";

export interface IChimeService {
    createChimeMeeting(payload: CreateChimeMeetingRequest): Promise<CreateChimeMeetingResponse>;
    joinChimeMeeting(payload: JoinChimeMeetingRequest): Promise<JoinChimeMeetingResponse>;
}