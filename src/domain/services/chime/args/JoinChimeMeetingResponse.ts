import { ApplicationError } from "../../../models/ApplicationError";

export class JoinChimeMeetingResponse {
    attendeeResponse: Record<string, any>;
    error: ApplicationError;
}