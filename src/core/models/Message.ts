import { User } from "./User";
import { Room } from "./Room";

export class Message {
  id: string;

  text: string;

  stamp: Date;

  user: User;

  room: Room;
}
