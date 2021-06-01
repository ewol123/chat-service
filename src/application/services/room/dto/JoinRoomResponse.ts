import { User } from "../../../../core/models/User";
import { Message } from "../../../../core/models/Message";
import { ApplicationError } from "../../../../core/models/ApplicationError";

export class JoinRoomResponse {
  roomIdentifier: string;
  users: User[];
  messages: Message[];
  error: ApplicationError;
}
