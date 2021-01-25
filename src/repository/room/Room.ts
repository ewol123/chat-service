import { Entity, BaseEntity, Column, OneToMany, PrimaryColumn } from "typeorm";

import { User } from "../user/User";
import { Message } from "../message/Message";

@Entity("room")
export class Room extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("uuid", { unique: true, nullable: false })
  identifier: string;

  @OneToMany((type) => User, (user) => user.room)
  users: User[];

  @OneToMany((type) => Message, (message) => message.room)
  messages: Message[];
}
