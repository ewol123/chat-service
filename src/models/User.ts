import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import {Room} from "./Room";
import { Message } from "./Message";

import { Length } from "class-validator"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false})
    @Length(1,50)
    name: string;

    @Column({nullable: true})
    avatar?: string;

    @Column({nullable: false})
    socketId: string;

    @ManyToOne(type => Room, room => room.users)
    room: Room;

    @OneToMany(type => Message, message => message.user)
    messages: Message[]

}