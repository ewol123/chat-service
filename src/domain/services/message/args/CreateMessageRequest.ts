import { IsUUID, Length, IsString } from "class-validator"

export class CreateMessageRequest {

    @IsString()
    @IsUUID(4)
    userIdentifier: string;
    
    @IsString()
    @Length(1,255)
    text: string;
}