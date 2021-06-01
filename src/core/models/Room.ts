import { User } from "./User";
import { Message } from "./Message";

export class Room {
  id: string;

  identifier: string;

  users: User[];

  messages: Message[];
}
