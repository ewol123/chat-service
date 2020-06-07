import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";

import { User } from "./User";
import { Message } from "./Message";

@Entity()
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('uuid',{unique: true, nullable: false})
    identifier: string;

    @OneToMany(type => User, user => user.room)
    users: User[];
    
    @OneToMany(type => Message, message => message.room)
    messages: Message[]

}