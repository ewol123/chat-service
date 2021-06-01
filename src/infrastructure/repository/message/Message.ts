import { Entity, BaseEntity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../user/User";
import { Room } from "../room/Room";

@Entity("message")
export class Message extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column({nullable: false, length:255})
  text: string;

  @Column({type: "timestamp"})
  stamp: Date;

  @ManyToOne(type => User, user => user.messages)
  user: User;

  @ManyToOne(type => Room, room => room.messages)
  room: Room;

}