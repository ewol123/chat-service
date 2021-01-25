import { Container } from "inversify";
import { assert, expect } from "chai";

import { MessageService } from "../../domain/services/message/MessageService";
import { IUnitOfWork } from "../../domain/repository/IUnitOfWork";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { IMessageRepository } from "../../domain/repository/IMessageRepository";
import { IMessageService } from "../../domain/services/message/IMessageService";
import { CreateMessageRequest } from "../../domain/services/message/args/CreateMessageRequest";

import { MockUnitOfWork } from "../lib/MockUnitOfWork";
import { MockUserRepository } from "../lib/MockUserRepository";
import { MockMessageRepository } from "../lib/MockMessageRepository";

import { TYPES } from "../../types";


describe("MessageService", () => {
  const ioc = new Container();
  ioc
    .bind<IUnitOfWork>(TYPES.IUnitOfWork)
    .to(MockUnitOfWork)
    .inSingletonScope();
  ioc.bind<IUserRepository>(TYPES.IUserRepository).to(MockUserRepository);
  ioc.bind<IMessageRepository>(TYPES.IMessageRepository).to(MockMessageRepository);
  ioc.bind<IMessageService>(TYPES.IMessageService).to(MessageService);

  const service = ioc.get<IMessageService>(TYPES.IMessageService);
  it("should create a new instance", (done) => {
    assert.instanceOf(service, MessageService);
    done();
  });
  describe("createChimeMeeting", () => {
    it("should create a message", async () => {
      const request = new CreateMessageRequest();
      request.userIdentifier = "792c77c4-d753-495e-bfc7-a148541dec8c";
      request.text = "hello world";

      const response = await service.createMessage(request);
      
      assert.isUndefined(response.error);
      expect(response).to.have.property("message");
      expect(response).to.have.property("roomIdentifier");
      assert.equal(response.roomIdentifier, "ac94782d-dadc-49cd-bb33-9fcf215a3e61");
      assert.equal(response.message.text, request.text);
    });
    it("should return error when business validation fails", async () => {
      const request = new CreateMessageRequest();
      request.userIdentifier = "asdasd123";
      const response = await service.createMessage(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
    it("should return error when user is incorrect", async () => {
      const request = new CreateMessageRequest();
      request.userIdentifier = "a2e20329-e47a-4b02-b4b1-f62e4a4ba3ae";
      request.text = "hello world";
      const response = await service.createMessage(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
  });
});
