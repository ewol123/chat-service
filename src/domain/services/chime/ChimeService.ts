import "reflect-metadata";
import { validate } from "class-validator";
import AWS from "aws-sdk";
import { injectable, inject } from "inversify";
import { v4 as uuidv4 } from "uuid";

import { TYPES } from "../../../types";

// You must use "us-east-1" as the region for Chime API and set the endpoint.
const chime = new AWS.Chime({ region: "us-east-1" });
chime.endpoint = new AWS.Endpoint(
  "https://service.chime.aws.amazon.com/console"
);

import { IChimeService } from "./IChimeService";
import { CreateChimeMeetingRequest } from "./args/CreateChimeMeetingRequest";
import { CreateChimeMeetingResponse } from "./args/CreateChimeMeetingResponse";
import { JoinChimeMeetingRequest } from "./args/JoinChimeMeetingRequest";
import { JoinChimeMeetingResponse } from "./args/JoinChimeMeetingResponse";
import { IUserRepository } from "../../repository/IUserRepository";
import { ApplicationError, BusinessError } from "../../models/ApplicationError";
import log from "../../../utils/logger";
import { IUnitOfWork } from "../../repository/IUnitOfWork";

@injectable()
export class ChimeService implements IChimeService {

  @inject(TYPES.IUserRepository) repository: IUserRepository;
  @inject(TYPES.IUnitOfWork) unitOfWork: IUnitOfWork;
  
  /**
   * Create a new chime meeting.
   * This video conference can be joined by others,
   * if they have the creator's meetingId
   */
  async createChimeMeeting(
    payload: CreateChimeMeetingRequest
  ): Promise<CreateChimeMeetingResponse> {
    try {
      const response = new CreateChimeMeetingResponse();

      const errors = await validate(payload);
      if (errors.length > 0) {
        throw errors.map((e) => new BusinessError(e.toString()));
      }

      const user = await this.repository.findById(payload.userIdentifier);

      if (!user) {
        log.warn({ message: "[ChimeService.createChimeMeeting]: no user found" });
        throw new BusinessError("no user found");
      }

      const meetingResponse = await chime
        .createMeeting({
          ClientRequestToken: uuidv4(),
          MediaRegion: "us-west-2",
        })
        .promise();

      const attendeeResponse = await chime
        .createAttendee({
          MeetingId: meetingResponse.Meeting.MeetingId,
          ExternalUserId: user.id,
        })
        .promise();

      response.meetingResponse = meetingResponse;
      response.attendeeResponse = attendeeResponse;
      return response;
    } catch (error) {
      const response = new CreateChimeMeetingResponse();
      response.error = new ApplicationError(error);
      return response;
    }
  }

  /**
   * Join an existing chime meeting.
   * Users can join to a video conference,
   * if they have the creator's meetingId
   */
  async joinChimeMeeting(
    payload: JoinChimeMeetingRequest
  ): Promise<JoinChimeMeetingResponse> {
    try {

      const response = new JoinChimeMeetingResponse();

      const errors = await validate(payload);
      if (errors.length > 0) {
        throw errors.map((e) => new BusinessError(e.toString()));
      }

      const user = await this.repository.findById(payload.userIdentifier);
  
      if (!user) {
        log.warn({ message: "[ChimeService.joinChimeMeeting]: no user found" });
        throw new BusinessError("no user found");
      }
  
      const attendeeResponse = await chime
        .createAttendee({
          MeetingId: payload.meetingId,
          ExternalUserId: user.id // Link the attendee to an identity managed by your application.
        })
        .promise();

      response.attendeeResponse = attendeeResponse;
      return response;
    } catch (error) {
      const response = new JoinChimeMeetingResponse();
      response.error = new ApplicationError(error);
      return response;
    }
  }
}
