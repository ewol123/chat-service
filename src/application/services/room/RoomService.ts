import "reflect-metadata";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";
import { injectable, inject } from "inversify";

import { TYPES } from "../../../types";
import { IRoomService } from "./IRoomService";
import { JoinRoomRequest } from "./dto/JoinRoomRequest";
import { JoinRoomResponse } from "./dto/JoinRoomResponse";
import { LeaveRoomRequest } from "./dto/LeaveRoomRequest";
import { LeaveRoomResponse } from "./dto/LeaveRoomResponse";
import { ApplicationError, BusinessError } from "../../../core/models/ApplicationError";
import { IRoomRepository } from "../../../core/repository/IRoomRepository";
import { IUserRepository } from "../../../core/repository/IUserRepository";
import { IMessageRepository } from "../../../core/repository/IMessageRepository";
import { IUnitOfWork } from "../../../core/repository/IUnitOfWork";
import { Room } from "../../../core/models/Room";
import log from "../../../utils/logger";

@injectable()
export class RoomService implements IRoomService {
  @inject(TYPES.IUserRepository) userRepository: IUserRepository;
  @inject(TYPES.IUnitOfWork) unitOfWork: IUnitOfWork;
  @inject(TYPES.IRoomRepository) roomRepository: IRoomRepository;
  @inject(TYPES.IMessageRepository) messageRepository: IMessageRepository;

  /**
   * Join a room with it's identifier.
   * If the room does not exist create it
   * otherwise join.
   */
  async joinRoom(payload: JoinRoomRequest): Promise<JoinRoomResponse> {
    try {
      const response = new JoinRoomResponse();

      const errors = await validate(payload);
      if (errors.length > 0) {
        throw errors.map((e) => new BusinessError(e.toString()));
      }

      const user = await this.userRepository.findRoomOfUserById(
        payload.userIdentifier
      );

      if (!user) {
        log.warn({ message: "[RoomService.joinRoom]: no user found" });
        throw new BusinessError("no user found");
      }

      let room = await this.roomRepository.findByIdentifier(
        payload.roomIdentifier
      );

      await this.unitOfWork.start();

      if (!room) {
        room = new Room();
        room.id = uuidv4();
        room.identifier = payload.roomIdentifier;
        room.users = [user];
        room.messages = [];
      } else {
        room.users = await this.userRepository.findAllByRoomId(room.id);
        room.users.push(user);
      }

      const work = async () => {
        await this.roomRepository.save(room);
      };

      await this.unitOfWork.complete(work);

      response.roomIdentifier = room.identifier;
      response.users = room.users;
      response.messages = await this.messageRepository.findAllByRoomId(room.id);

      return response;
    } catch (error) {
      const response = new JoinRoomResponse();
      response.error = new ApplicationError(error);
      return response;
    }
  }

  /**
   * Leave a room the user is currently in.
   */
  async leaveRoom(payload: LeaveRoomRequest): Promise<LeaveRoomResponse> {
    try {
      const response = new LeaveRoomResponse();

      const errors = await validate(payload);
      if (errors.length > 0) {
        throw errors.map((e) => new BusinessError(e.toString()));
      }

      const user = await this.userRepository.findRoomOfUserById(
        payload.userIdentifier
      );

      if (!user) {
        log.warn({ message: "[RoomService.leaveRoom]: no user found" });
        throw new BusinessError("no user found");
      }

      if (!user.room) {
        log.warn({
          message: "[RoomService.leaveRoom]: user is not in any room",
        });
        throw new BusinessError("user is not in any room");
      }

      await this.unitOfWork.start();

      const roomUsers = await this.userRepository.findAllByRoomId(user.room.id);

      user.room.users = roomUsers.filter(
        (roomUser) => roomUser.id !== payload.userIdentifier
      );

      const work = async () => {
        await this.roomRepository.save(user.room);
      };

      await this.unitOfWork.complete(work);

      response.roomIdentifier = user.room.identifier;
      response.users = user.room.users;

      return response;
    } catch (error) {
      const response = new LeaveRoomResponse();
      response.error = new ApplicationError(error);
      return response;
    }
  }
}
