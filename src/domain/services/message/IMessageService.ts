import { CreateMessageRequest } from "./args/CreateMessageRequest";
import { CreateMessageResponse } from "./args/CreateMessageResponse";

export interface IMessageService {
    createMessage(payload: CreateMessageRequest): Promise<CreateMessageResponse>;
}