import { IsUUID, IsString } from "class-validator"

export class CreateChimeMeetingRequest {
    @IsString()
    @IsUUID(4)
    userIdentifier: string;
}