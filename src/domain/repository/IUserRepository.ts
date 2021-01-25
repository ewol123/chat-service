import { User } from "../models/User";

export interface IUserRepository {
  findById(id: string): Promise<User>;
  findBySocketId(socketId: string): Promise<User>;
  findRoomOfUserById(id: string): Promise<User>;
  findRoomOfUserBySocketId(socketId: string): Promise<User>;
  findAllByRoomId(roomId: string): Promise<User[]>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<void>;
  remove(user: User): Promise<void>;
}
