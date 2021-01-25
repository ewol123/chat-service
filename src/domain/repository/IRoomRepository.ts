import { Room } from "../models/Room";

export interface IRoomRepository {
  findById(id: string): Promise<Room>;
  findByIdentifier(identifier: string): Promise<Room>;
  findAll(): Promise<Room[]>;
  save(room: Room): Promise<void>;
  remove(room: Room): Promise<void>;
}
