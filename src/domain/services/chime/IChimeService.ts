import { CreateChimeMeetingResponse } from "./args/CreateChimeMeetingResponse";
import { CreateChimeMeetingRequest } from "./args/CreateChimeMeetingRequest";
import { JoinChimeMeetingRequest } from "./args/JoinChimeMeetingRequest";
import { JoinChimeMeetingResponse } from "./args/JoinChimeMeetingResponse";

export interface IChimeService {
    createChimeMeeting(payload: CreateChimeMeetingRequest): Promise<CreateChimeMeetingResponse>;
    joinChimeMeeting(payload: JoinChimeMeetingRequest): Promise<JoinChimeMeetingResponse>;
}