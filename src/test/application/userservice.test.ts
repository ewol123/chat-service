import { Container } from "inversify";
import { assert, expect } from "chai";

import { UserService } from "../../application/services/user/UserService";
import { IUnitOfWork } from "../../core/repository/IUnitOfWork";
import { IUserRepository } from "../../core/repository/IUserRepository";
import { IRoomRepository } from "../../core/repository/IRoomRepository";
import { IUserService } from "../../application/services/user/IUserService";
import { CreateUserRequest } from "../../application/services/user/dto/CreateUserRequest";
import { DisconnectRequest } from "../../application/services/user/dto/DisconnectRequest";

import { MockUnitOfWork } from "../lib/MockUnitOfWork";
import { MockUserRepository } from "../lib/MockUserRepository";
import { MockRoomRepository } from "../lib/MockRoomRepository";


import { TYPES } from "../../types";

describe("UserService", () => {
  const ioc = new Container();
  ioc
    .bind<IUnitOfWork>(TYPES.IUnitOfWork)
    .to(MockUnitOfWork)
    .inSingletonScope();
  ioc.bind<IUserRepository>(TYPES.IUserRepository).to(MockUserRepository);
  ioc.bind<IRoomRepository>(TYPES.IRoomRepository).to(MockRoomRepository);
  ioc.bind<IUserService>(TYPES.IUserService).to(UserService);

  const service = ioc.get<IUserService>(TYPES.IUserService);
  it("should create a new instance", (done) => {
    assert.instanceOf(service, UserService);
    done();
  });
  describe("createUser", () => {
    it("should create a user", async () => {
      const request = new CreateUserRequest();
      request.name = "Test";
      request.socketId = "e5fa995d-007c-45e7-b222-25b1b70c3f45";

      const response = await service.createUser(request);

      assert.isUndefined(response.error);
      expect(response).to.have.property("user");
      expect(response.user).to.have.property("id");
      expect(response.user).to.have.property("name");
    });
    it("should return error when business validation fails", async () => {
      const request = new CreateUserRequest();
      request.name =
        "This name is too long so it should throw a validation error, because it's length is more than 255 characters..........................................................................................................................................................................";
      request.socketId = "invalid";
      const response = await service.createUser(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
  });
  describe("disconnect", () => {
    it("should disconnect correctly", async () => {
      const request = new DisconnectRequest();
      request.socketId = "e5fa995d-007c-45e7-b222-25b1b70c3f45";

      const response = await service.disconnect(request);

      assert.isUndefined(response.error);
      expect(response).to.have.property("roomIdentifier");
      expect(response).to.have.property("users");

      expect(response.users).to.be.an("array");
    });
    it("should return error when business validation fails", async () => {
      const request = new DisconnectRequest();
      request.socketId = "asdasd123";
      const response = await service.disconnect(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
    it("should return error when user is incorrect", async () => {
      const request = new DisconnectRequest();
      request.socketId = "a2e20329-e47a-4b02-b4b1-f62e4a4ba3ae";
      const response = await service.disconnect(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
  });
});
