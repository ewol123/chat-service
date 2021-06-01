import { ApplicationError } from "../../../../core/models/ApplicationError";

export class JoinChimeMeetingResponse {
    attendeeResponse: Record<string, any>;
    error: ApplicationError;
}