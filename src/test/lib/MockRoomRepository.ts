import { IRoomRepository } from "../../core/repository/IRoomRepository";
import { Room } from "../../core/models/Room";
import { rooms } from "./dataProvider";
import { injectable } from "inversify";

@injectable()
export class MockRoomRepository implements IRoomRepository {
  findById(id: string): Promise<Room> {
    const res = rooms.find((m) => m.id === id);
    return Promise.resolve(res);
  }
  findByIdentifier(identifier: string): Promise<Room> {
    const res = rooms.find((m) => m.identifier === identifier);
    return Promise.resolve(res);
  }
  findAll(): Promise<Room[]> {
    return Promise.resolve(rooms);
  }
  save(room: Room): Promise<void> {
    rooms.push(room);
    return Promise.resolve();
  }
  remove(room: Room): Promise<void> {
    const index = rooms.findIndex((m) => m.id === room.id);
    if (index !== -1) {
      rooms.splice(index, 1);
    }
    return Promise.resolve();
  }
}
