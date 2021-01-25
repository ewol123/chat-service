import { injectable, inject } from "inversify";

import { IMessageRepository } from "../../domain/repository/IMessageRepository";
import { Message } from "../../domain/models/Message";
import { Message as DBMessage } from "./Message";
import { IUnitOfWork } from "../../domain/repository/IUnitOfWork";
import { TYPES } from "../../types";
import { Repository } from "typeorm";

@injectable()
export class MessageRepository implements IMessageRepository {
  private readonly unitOfWork: IUnitOfWork;

  constructor(@inject(TYPES.IUnitOfWork) uof: IUnitOfWork) {
    this.unitOfWork = uof;
  }

  async findById(id: string): Promise<Message> {
    const dbResponse = await DBMessage.findOne({
      where: { id },
    });
    return dbResponse;
  }
  async findAllByRoomId(roomId: string): Promise<Message[]> {
    const dbResponse = await DBMessage.find({
      where: { room: { id: roomId } },
      relations: ["user"],
    });
    return dbResponse;
  }
  async findAll(): Promise<Message[]> {
    const dbResponse = await DBMessage.find();
    return dbResponse;
  }
  async save(message: Message): Promise<void> {
    const repo: Repository<DBMessage> = this.unitOfWork.getRepository(
      DBMessage
    );
    const model = new DBMessage();
    Object.assign(model, message);
    await repo.save(model);
  }
  async remove(message: Message): Promise<void> {
    const repo: Repository<DBMessage> = this.unitOfWork.getRepository(
      DBMessage
    );
    const model = new DBMessage();
    Object.assign(model, message);
    await repo.remove(model);
  }
}
