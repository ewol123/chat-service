import { Message } from "../models/Message";

export interface IMessageRepository {
    findById(id: string): Promise<Message>;
    findAllByRoomId(roomId: string): Promise<Message[]>;
    findAll(): Promise<Message[]>;
    save(message: Message): Promise<void>;
    remove(message: Message): Promise<void>;
}