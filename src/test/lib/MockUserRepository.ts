import { IUserRepository } from "../../domain/repository/IUserRepository";
import { User } from "../../domain/models/User";
import { users } from "./dataProvider";
import { injectable } from "inversify";

@injectable()
export class MockUserRepository implements IUserRepository {
  findById(id: string): Promise<User> {
    const res = users.find((m) => m.id === id);
    return Promise.resolve(res);
  }
  findBySocketId(socketId: string): Promise<User> {
    const res = users.find((m) => m.socketId === socketId);
    return Promise.resolve(res);
  }
  findRoomOfUserById(id: string): Promise<User> {
    const res = users.find((m) => m.id === id);
    return Promise.resolve(res);
  }
  findRoomOfUserBySocketId(socketId: string): Promise<User> {
    const res = users.find((m) => m.socketId === socketId);
    return Promise.resolve(res);
  }
  findAllByRoomId(roomId: string): Promise<User[]> {
    const res = users.filter((m) => m.room?.id === roomId);
    return Promise.resolve(res);
  }
  findAll(): Promise<User[]> {
    return Promise.resolve(users);
  }
  save(message: User): Promise<void> {
    users.push(message);
    return Promise.resolve();
  }
  remove(message: User): Promise<void> {
    const index = users.findIndex((m) => m.id === message.id);
    if (index !== -1) {
      users.splice(index, 1);
    }
    return Promise.resolve();
  }
}
