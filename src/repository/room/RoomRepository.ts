import { injectable, inject } from "inversify";

import { IRoomRepository } from "../../domain/repository/IRoomRepository";
import { Room } from "../../domain/models/Room";
import { Room as DBRoom } from "./Room";
import { IUnitOfWork } from "../../domain/repository/IUnitOfWork";
import { TYPES } from "../../types";
import { Repository } from "typeorm";

@injectable()
export class RoomRepository implements IRoomRepository {
  private readonly unitOfWork: IUnitOfWork;

  constructor(@inject(TYPES.IUnitOfWork) uof: IUnitOfWork) {
    this.unitOfWork = uof;
  }

  async findById(id: string): Promise<Room> {
    const dbResponse = await DBRoom.findOne({
      where: { id },
    });

    const response = dbResponse;
    return response;
  }
  async findByIdentifier(identifier: string): Promise<Room> {
    const dbResponse = await DBRoom.findOne({
      where: { identifier },
    });

    const response = dbResponse;
    return response;
  }
  async findAll(): Promise<Room[]> {
    const dbResponse = await DBRoom.find();

    const response = dbResponse;
    return response;
  }
  async save(room: Room): Promise<void> {
    const repo: Repository<DBRoom> = this.unitOfWork.getRepository(DBRoom);
    const model = new DBRoom();
    Object.assign(model, room);
    await repo.save(model);
  }
  async remove(room: Room): Promise<void> {
    const repo: Repository<DBRoom> = this.unitOfWork.getRepository(DBRoom);
    const model = new DBRoom();
    Object.assign(model, room);
    await repo.remove(model);
  }
}
