import { User } from "../../../../core/models/User";
import { ApplicationError } from "../../../../core/models/ApplicationError";
export class DisconnectResponse {
  roomIdentifier: string;
  users: User[];
  error: ApplicationError
}
