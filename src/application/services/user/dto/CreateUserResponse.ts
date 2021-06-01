import { ApplicationError } from "../../../../core/models/ApplicationError";

export class CreateUserResponse {
  user: { id: string; name: string } = {id: "", name: ""};
  error: ApplicationError
}
