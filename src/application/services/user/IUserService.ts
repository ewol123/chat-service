import { DisconnectRequest } from "./dto/DisconnectRequest";
import { DisconnectResponse } from "./dto/DisconnectResponse";
import { CreateUserResponse } from "./dto/CreateUserResponse";
import { CreateUserRequest } from "./dto/CreateUserRequest";

export interface IUserService {
  createUser(payload: CreateUserRequest): Promise<CreateUserResponse>;
  disconnect(payload: DisconnectRequest): Promise<DisconnectResponse>;
}
