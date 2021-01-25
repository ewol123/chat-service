import { IsUUID, IsString } from "class-validator"

export class JoinChimeMeetingRequest {
    @IsString()
    @IsUUID(4)
    userIdentifier: string;
    
    @IsString()
    @IsUUID(4)
    meetingId: string;
}