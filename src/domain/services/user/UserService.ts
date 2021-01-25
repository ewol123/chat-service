import "reflect-metadata";
import { validate } from "class-validator";
import { v4 as uuidv4 } from "uuid";
import { injectable, inject } from "inversify";

import { TYPES } from "../../../types";
import { IUserService } from "./IUserService";
import { CreateUserRequest } from "./args/CreateUserRequest";
import { CreateUserResponse } from "./args/CreateUserResponse";
import { DisconnectRequest } from "./args/DisconnectRequest";
import { DisconnectResponse } from "./args/DisconnectResponse";
import { ApplicationError, BusinessError } from "../../models/ApplicationError";
import { IRoomRepository } from "../../repository/IRoomRepository";
import { IUserRepository } from "../../repository/IUserRepository";
import { IUnitOfWork } from "../../repository/IUnitOfWork";
import { User } from "../../models/User";
import log from "../../../utils/logger";

@injectable()
export class UserService implements IUserService {
  @inject(TYPES.IUserRepository) userRepository: IUserRepository;
  @inject(TYPES.IUnitOfWork) unitOfWork: IUnitOfWork;
  @inject(TYPES.IRoomRepository) roomRepository: IRoomRepository;

  /**
   * Create a new user
   * with the provided name.
   */
  async createUser(payload: CreateUserRequest): Promise<CreateUserResponse> {
    try {
      const response = new CreateUserResponse();

      const errors = await validate(payload);
      if (errors.length > 0) {
        throw errors.map((e) => new BusinessError(e.toString()));
      }

      await this.unitOfWork.start();

      const user = new User();
      user.id = uuidv4();
      user.name = payload.name;
      user.socketId = payload.socketId;

      const work = async () => {
        await this.userRepository.save(user);
      };

      await this.unitOfWork.complete(work);

      response.user.id = user.id;
      response.user.name = user.name;
      return response;
    } catch (error) {
      const response = new CreateUserResponse();
      response.error = new ApplicationError(error);
      return response;
    }
  }

  /**
   * Leave a room the user is currently in.
   */
  async disconnect(payload: DisconnectRequest): Promise<DisconnectResponse> {
    try {
      const response = new DisconnectResponse();

      const errors = await validate(payload);
      if (errors.length > 0) {
        throw errors.map((e) => new BusinessError(e.toString()));
      }

      const user = await this.userRepository.findRoomOfUserBySocketId(
        payload.socketId
      );

      if (!user) {
        log.warn({ message: "[UserService.disconnect]: no user found" });
        throw new BusinessError("no user found");
      }

      if (!user.room) {
        log.warn({
          message: "[UserService.disconnect]: user is not in any room",
        });
        throw new BusinessError("user is not in any room");
      }

      const { room } = user;
      const users = await this.userRepository.findAllByRoomId(room.id);

      await this.unitOfWork.start();

      user.room = null;

      const work = async () => {
        await this.userRepository.save(user);
      };

      await this.unitOfWork.complete(work);

      response.roomIdentifier = room.identifier;
      response.users = users.filter(
        (roomUser) => roomUser.socketId !== payload.socketId
      );

      return response;
    } catch (error) {
      const response = new DisconnectResponse();
      response.error = new ApplicationError(error);
      return response;
    }
  }
}
