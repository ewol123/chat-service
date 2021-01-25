import { User } from "../../../models/User";
import { Message } from "../../../models/Message";
import { ApplicationError } from "../../../models/ApplicationError";

export class JoinRoomResponse {
  roomIdentifier: string;
  users: User[];
  messages: Message[];
  error: ApplicationError;
}
