import { Container } from "inversify";
import { assert, expect } from "chai";

import { RoomService } from "../../domain/services/room/RoomService";
import { IUnitOfWork } from "../../domain/repository/IUnitOfWork";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { IMessageRepository } from "../../domain/repository/IMessageRepository";
import { IRoomService } from "../../domain/services/room/IRoomService";
import { IRoomRepository } from "../../domain/repository/IRoomRepository";
import { JoinRoomRequest } from "../../domain/services/room/args/JoinRoomRequest";
import { LeaveRoomRequest } from "../../domain/services/room/args/LeaveRoomRequest";

import { MockUnitOfWork } from "../lib/MockUnitOfWork";
import { MockUserRepository } from "../lib/MockUserRepository";
import { MockMessageRepository } from "../lib/MockMessageRepository";
import { MockRoomRepository } from "../lib/MockRoomRepository";

import { TYPES } from "../../types";


describe("RoomService", () => {
  const ioc = new Container();
  ioc
    .bind<IUnitOfWork>(TYPES.IUnitOfWork)
    .to(MockUnitOfWork)
    .inSingletonScope();
  ioc.bind<IUserRepository>(TYPES.IUserRepository).to(MockUserRepository);
  ioc
    .bind<IMessageRepository>(TYPES.IMessageRepository)
    .to(MockMessageRepository);
  ioc.bind<IRoomRepository>(TYPES.IRoomRepository).to(MockRoomRepository);
  ioc.bind<IRoomService>(TYPES.IRoomService).to(RoomService);

  const service = ioc.get<IRoomService>(TYPES.IRoomService);
  it("should create a new instance", (done) => {
    assert.instanceOf(service, RoomService);
    done();
  });
  describe("joinRoom", () => {
    it("should join a room", async () => {
      const request = new JoinRoomRequest();
      request.userIdentifier = "84142c4f-de58-45e1-90ce-d698501a9caa";
      request.roomIdentifier = "ac94782d-dadc-49cd-bb33-9fcf215a3e61";

      const response = await service.joinRoom(request);

      assert.isUndefined(response.error);
      expect(response).to.have.property("roomIdentifier");
      expect(response).to.have.property("users");
      expect(response).to.have.property("messages");

      expect(response.users).to.be.an("array");

      expect(response.messages).to.be.an("array");
    });
    it("should return error when business validation fails", async () => {
      const request = new JoinRoomRequest();
      request.userIdentifier = "asdasd123";
      const response = await service.joinRoom(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
    it("should return error when user is incorrect", async () => {
      const request = new JoinRoomRequest();
      request.userIdentifier = "a2e20329-e47a-4b02-b4b1-f62e4a4ba3ae";
      request.roomIdentifier = "84142c4f-de58-45e1-90ce-d698501a9caa";

      const response = await service.joinRoom(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
  });
  describe("leaveRoom", () => {
    it("should leave a room", async () => {
      const request = new LeaveRoomRequest();
      request.userIdentifier = "792c77c4-d753-495e-bfc7-a148541dec8c";

      const response = await service.leaveRoom(request);

      assert.isUndefined(response.error);
      expect(response).to.have.property("roomIdentifier");
      expect(response).to.have.property("users");

      expect(response.users).to.be.an("array");
    });
    it("should return error when business validation fails", async () => {
      const request = new LeaveRoomRequest();
      request.userIdentifier = "asdasd123";
      const response = await service.leaveRoom(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
    it("should return error when user is incorrect", async () => {
      const request = new LeaveRoomRequest();
      request.userIdentifier = "a2e20329-e47a-4b02-b4b1-f62e4a4ba3ae";
      const response = await service.leaveRoom(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
  });
});
