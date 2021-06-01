import { Room } from "./Room";
import { Message } from "./Message";

export class User {
  id: string;

  name: string;

  avatar?: string;

  socketId: string;

  room: Room;

  messages: Message[];
}
