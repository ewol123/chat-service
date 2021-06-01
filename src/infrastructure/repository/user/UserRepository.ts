import { injectable, inject } from "inversify";

import { IUserRepository } from "../../../core/repository/IUserRepository";
import { User } from "../../../core/models/User";
import { User as DBUser } from "./User";
import { TYPES } from "../../../types";
import { IUnitOfWork } from "../../../core/repository/IUnitOfWork";
import { Repository } from "typeorm";

@injectable()
export class UserRepository implements IUserRepository {
  private readonly unitOfWork: IUnitOfWork;

  constructor(@inject(TYPES.IUnitOfWork) uof: IUnitOfWork) {
    this.unitOfWork = uof;
  }

  async findById(id: string): Promise<User> {
    const dbResponse = await DBUser.findOne({
      where: { id },
    });

    const response = dbResponse;
    return response;
  }
  async findBySocketId(socketId: string): Promise<User> {
    const dbResponse = await DBUser.findOne({
      where: { socketId },
    });

    const response = dbResponse;
    return response;
  }
  async findRoomOfUserById(id: string): Promise<User> {
    const dbResponse = await DBUser.findOne({
      where: { id },
      relations: ["room"],
    });

    const response = dbResponse;
    return response;
  }
  async findRoomOfUserBySocketId(socketId: string): Promise<User> {
    const dbResponse = await DBUser.findOne({
      where: { socketId },
      relations: ["room"],
    });

    const response = dbResponse;
    return response;
  }
  async findAllByRoomId(roomId: string): Promise<User[]> {
    const dbResponse = await DBUser.find({
      where: { room: { id: roomId } },
    });
    return dbResponse;
  }
  async findAll(): Promise<User[]> {
    const dbResponse = await DBUser.find();

    const response = dbResponse;
    return response;
  }
  async save(user: User): Promise<void> {
    const repo : Repository<DBUser> = this.unitOfWork.getRepository(DBUser);
    const model = new DBUser();
    Object.assign(model, user);
    await repo.save(model);
  }
  async remove(user: User): Promise<void> {
    const repo : Repository<DBUser> = this.unitOfWork.getRepository(DBUser);
    const model = new DBUser();
    Object.assign(model, user);
    await repo.remove(model);
  }
}
