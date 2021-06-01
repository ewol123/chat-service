import { Message } from "../../../../core/models/Message"
import { ApplicationError } from "../../../../core/models/ApplicationError";

export class CreateMessageResponse {
    message: Message;
    roomIdentifier: string;
    error: ApplicationError;
}