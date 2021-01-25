import { Message } from "../../../models/Message"
import { ApplicationError } from "../../../models/ApplicationError";

export class CreateMessageResponse {
    message: Message;
    roomIdentifier: string;
    error: ApplicationError;
}