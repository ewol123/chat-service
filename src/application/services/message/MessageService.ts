import "reflect-metadata";
import { validate } from "class-validator";
import { v4 as uuidv4 } from 'uuid';
import { injectable, inject } from "inversify";

import { TYPES } from "../../../types";
import { IMessageRepository } from "../../../core/repository/IMessageRepository";
import { IUserRepository } from "../../../core/repository/IUserRepository";
import { IMessageService } from "./IMessageService";
import { CreateMessageRequest } from "./dto/CreateMessageRequest";
import { CreateMessageResponse } from "./dto/CreateMessageResponse";
import { ApplicationError, BusinessError } from "../../../core/models/ApplicationError";
import { Message } from "../../../core/models/Message";
import { IUnitOfWork } from "../../../core/repository/IUnitOfWork";
import log from "../../../utils/logger";

@injectable()
export class MessageService implements IMessageService {

  @inject(TYPES.IUserRepository) userRepository: IUserRepository;
  @inject(TYPES.IUnitOfWork) unitOfWork: IUnitOfWork;
  @inject(TYPES.IMessageRepository) messageRepository: IMessageRepository;

  /**
   * Create a new message in a specific room.
   * This message can be seen by others in the
   * same room.
   */
  async createMessage(
    payload: CreateMessageRequest
  ): Promise<CreateMessageResponse> {
    try {
      const response = new CreateMessageResponse();

      const errors = await validate(payload);
      if (errors.length > 0) {
        throw errors.map((e) => new BusinessError(e.toString()));
      }

      const user = await this.userRepository.findRoomOfUserById(
        payload.userIdentifier
      );

      if (!user) {
        log.warn({ message: "[MessageService.createMessage]: no user found" });
        throw new BusinessError("no user found");
      }

      if (!user.room) {
        log.warn({ message: "[MessageService.createMessage]: user is not in any room" });
        throw new BusinessError("no user found");
      }

      await this.unitOfWork.start();

      const message = new Message();
      message.id = uuidv4();
      message.text = payload.text;
      message.user = user;
      message.room = user.room;
      message.stamp = new Date();

      const work = async () => {
        await this.messageRepository.save(message);
      };

      await this.unitOfWork.complete(work);

      response.message = message;
      response.roomIdentifier = user.room.identifier;
      return response;
    } catch (error) {
      const response = new CreateMessageResponse();
      response.error = new ApplicationError(error);
      return response;
    }
  }
}
