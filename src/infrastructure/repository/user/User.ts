import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { Room } from "../room/Room";
import { Message } from "../message/Message";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column({ nullable: false, length: 255 })
  name: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: false })
  socketId: string;

  @ManyToOne((type) => Room, (room) => room.users)
  room: Room;

  @OneToMany((type) => Message, (message) => message.user)
  messages: Message[];
}
