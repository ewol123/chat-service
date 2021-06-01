import { CreateMessageRequest } from "./dto/CreateMessageRequest";
import { CreateMessageResponse } from "./dto/CreateMessageResponse";

export interface IMessageService {
    createMessage(payload: CreateMessageRequest): Promise<CreateMessageResponse>;
}