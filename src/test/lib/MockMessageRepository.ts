import { IMessageRepository } from "../../core/repository/IMessageRepository";
import { Message } from "../../core/models/Message";
import { messages } from "./dataProvider";
import { injectable } from "inversify";

@injectable()
export class MockMessageRepository implements IMessageRepository {
  findById(id: string): Promise<Message> {
    const res = messages.find((m) => m.id === id);
    return Promise.resolve(res);
  }
  findAllByRoomId(roomId: string): Promise<Message[]> {
    const res = messages.filter((m) => m.room.id === roomId);
    return Promise.resolve(res);
  }
  findAll(): Promise<Message[]> {
    return Promise.resolve(messages);
  }
  save(message: Message): Promise<void> {
    messages.push(message);
    return Promise.resolve();
  }
  remove(message: Message): Promise<void> {
    const index = messages.findIndex((m) => m.id === message.id);
    if (index !== -1) {
      messages.splice(index, 1);
    }
    return Promise.resolve();
  }
}
