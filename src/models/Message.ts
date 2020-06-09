import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Room } from "./Room";
import { Length } from "class-validator"

@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: false})
  @Length(1,255)
  text: string;

  @CreateDateColumn({type: "timestamp"})
  stamp: Date;

  @ManyToOne(type => User, user => user.messages, {eager: true})
  user: User;

  @ManyToOne(type => Room, room => room.messages)
  room: Room;
  
}