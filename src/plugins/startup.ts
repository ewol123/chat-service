import "reflect-metadata";
import { Container } from "inversify";
import { Connection } from "typeorm";
import createServer from "../plugins/createServer";
import connectSocketIO from "../plugins/connectSocketIO";
import { dbConnect } from "../infrastructure/pgdatabase";

import { TYPES } from "../types";
import { IChimeService } from "../application/services/chime/IChimeService";
import { IMessageService } from "../application/services/message/IMessageService";
import { IRoomService } from "../application/services/room/IRoomService";
import { IUserService } from "../application/services/user/IUserService";
import { IMessageRepository } from "../core/repository/IMessageRepository";
import { IRoomRepository } from "../core/repository/IRoomRepository";
import { IUserRepository } from "../core/repository/IUserRepository";
import { IUnitOfWork } from "../core/repository/IUnitOfWork";

import { ChimeService } from "../application/services/chime/ChimeService";
import { MessageService } from "../application/services/message/MessageService";
import { RoomService } from "../application/services/room/RoomService";
import { UserService } from "../application/services/user/UserService";
import { MessageRepository } from "../infrastructure/repository/message/MessageRepository";
import { RoomRepository } from "../infrastructure/repository/room/RoomRepository";
import { UserRepository } from "../infrastructure/repository/user/UserRepository";
import { UnitOfWork } from "../infrastructure/repository/UnitOfWork";
import { CommonService } from "../application/services/common/CommonService";

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
