import { User } from "../../../models/User";
import { ApplicationError } from "../../../models/ApplicationError";
export class DisconnectResponse {
  roomIdentifier: string;
  users: User[];
  error: ApplicationError
}
