import { User } from "../../../models/User";
import { ApplicationError } from "../../../models/ApplicationError";

export class LeaveRoomResponse {
    roomIdentifier: string;
    users: User[];
    error: ApplicationError;
}