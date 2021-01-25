import { Container } from "inversify";
import { assert, expect } from "chai";

import { ChimeService } from "../../domain/services/chime/ChimeService";
import { IUnitOfWork } from "../../domain/repository/IUnitOfWork";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { IChimeService } from "../../domain/services/chime/IChimeService";
import { CreateChimeMeetingRequest } from "../../domain/services/chime/args/CreateChimeMeetingRequest";
import { JoinChimeMeetingRequest } from "../../domain/services/chime/args/JoinChimeMeetingRequest";

import { MockUnitOfWork } from "../lib/MockUnitOfWork";
import { MockUserRepository } from "../lib/MockUserRepository";
import { getMeetingId } from "../lib/utils";

import { TYPES } from "../../types";


describe("ChimeService", () => {
  const ioc = new Container();
  ioc
    .bind<IUnitOfWork>(TYPES.IUnitOfWork)
    .to(MockUnitOfWork)
    .inSingletonScope();
  ioc.bind<IUserRepository>(TYPES.IUserRepository).to(MockUserRepository);
  ioc.bind<IChimeService>(TYPES.IChimeService).to(ChimeService);

  const service = ioc.get<IChimeService>(TYPES.IChimeService);
  it("should create a new instance", (done) => {
    assert.instanceOf(service, ChimeService);
    done();
  });
  describe("createChimeMeeting", () => {
    it("should create a chime meeting", async () => {
      const request = new CreateChimeMeetingRequest();
      request.userIdentifier = "792c77c4-d753-495e-bfc7-a148541dec8c";

      const response = await service.createChimeMeeting(request);
      expect(response).to.have.property("attendeeResponse");
      expect(response).to.have.property("meetingResponse");
      assert.isUndefined(response.error);
    });
    it("should return error when business validation fails", async () => {
      const request = new CreateChimeMeetingRequest();
      request.userIdentifier = "asdasd123";
      const response = await service.createChimeMeeting(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
    it("should return error when user is incorrect", async () => {
      const request = new CreateChimeMeetingRequest();
      request.userIdentifier = "a2e20329-e47a-4b02-b4b1-f62e4a4ba3ae";
      const response = await service.createChimeMeeting(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
  });
  describe("joinChimeMeeting", () => {
    it("should join a chime meeting", async () => {
      const request = new JoinChimeMeetingRequest();
      request.userIdentifier = "792c77c4-d753-495e-bfc7-a148541dec8c";
      request.meetingId = (await getMeetingId()).Meeting.MeetingId;

      const response = await service.joinChimeMeeting(request);

      expect(response).to.have.property("attendeeResponse");
      assert.isUndefined(response.error);
    });
    it("should return error when business validation fails", async () => {
      const request = new JoinChimeMeetingRequest();
      request.userIdentifier = "asdasd123";
      const response = await service.joinChimeMeeting(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
    it("should return error when user is incorrect", async () => {
      const request = new JoinChimeMeetingRequest();
      request.userIdentifier = "a2e20329-e47a-4b02-b4b1-f62e4a4ba3ae";
      request.meetingId = "a2e20329-e47a-4b02-b4b1-f62e4a4ba3ae";
      const response = await service.joinChimeMeeting(request);
      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
    it("should return error when meetingId is invalid", async () => {
      const request = new JoinChimeMeetingRequest();
      request.userIdentifier = "792c77c4-d753-495e-bfc7-a148541dec8c";
      request.meetingId = "792c77c4-d753-495e-bfc7-a148541dec8c";

      const response = await service.joinChimeMeeting(request);

      expect(response.error.businessErrors.length).to.be.greaterThan(0);
    });
  });
});
