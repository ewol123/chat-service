import "reflect-metadata";
import { Container } from "inversify";
import { Connection } from "typeorm";
import createServer from "../plugins/createServer";
import connectSocketIO from "../plugins/connectSocketIO";
import { dbConnect } from "../infrastructure/pgdatabase";

import { TYPES } from "../types";
import { IChimeService } from "../domain/services/chime/IChimeService";
import { IMessageService } from "../domain/services/message/IMessageService";
import { IRoomService } from "../domain/services/room/IRoomService";
import { IUserService } from "../domain/services/user/IUserService";
import { IMessageRepository } from "../domain/repository/IMessageRepository";
import { IRoomRepository } from "../domain/repository/IRoomRepository";
import { IUserRepository } from "../domain/repository/IUserRepository";
import { IUnitOfWork } from "../domain/repository/IUnitOfWork";

import { ChimeService } from "../domain/services/chime/ChimeService";
import { MessageService } from "../domain/services/message/MessageService";
import { RoomService } from "../domain/services/room/RoomService";
import { UserService } from "../domain/services/user/UserService";
import { MessageRepository } from "../repository/message/MessageRepository";
import { RoomRepository } from "../repository/room/RoomRepository";
import { UserRepository } from "../repository/user/UserRepository";
import { UnitOfWork } from "../repository/UnitOfWork";
import { CommonService } from "../domain/services/common/CommonService";

async function main() {
  const server = await createServer();
  const connection = await dbConnect(true); //use different db implementation if you want. example mongodb etc.

  const ioc = new Container();

  ioc.bind<Connection>(TYPES.DbConnection).toConstantValue(connection);
  ioc.bind<IUnitOfWork>(TYPES.IUnitOfWork).to(UnitOfWork).inSingletonScope();

  ioc.bind<IMessageRepository>(TYPES.IMessageRepository).to(MessageRepository);
  ioc.bind<IRoomRepository>(TYPES.IRoomRepository).to(RoomRepository);
  ioc.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

  ioc.bind<IChimeService>(TYPES.IChimeService).to(ChimeService);
  ioc.bind<IMessageService>(TYPES.IMessageService).to(MessageService);
  ioc.bind<IRoomService>(TYPES.IRoomService).to(RoomService);
  ioc.bind<IUserService>(TYPES.IUserService).to(UserService);

  const chimeService = ioc.get<IChimeService>(TYPES.IChimeService);
  const messageService = ioc.get<IMessageService>(TYPES.IMessageService);
  const roomService = ioc.get<IRoomService>(TYPES.IRoomService);
  const userService = ioc.get<IUserService>(TYPES.IUserService);
  const commonService = new CommonService(); // no deps yet.

  const ioServer = connectSocketIO(server, {
    chimeService,
    messageService,
    roomService,
    userService,
    commonService,
  }); // connect another transport layer for example: a rest interface.

  return { server, ioServer };
}
export { main };
