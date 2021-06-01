import { ApplicationError } from "../../../../core/models/ApplicationError";

export class CreateChimeMeetingResponse {
  meetingResponse: Record<string, any>;
  attendeeResponse: Record<string, any>;
  error: ApplicationError;
}
