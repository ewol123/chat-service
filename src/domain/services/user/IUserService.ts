import { DisconnectRequest } from "./args/DisconnectRequest";
import { DisconnectResponse } from "./args/DisconnectResponse";
import { CreateUserResponse } from "./args/CreateUserResponse";
import { CreateUserRequest } from "./args/CreateUserRequest";

export interface IUserService {
  createUser(payload: CreateUserRequest): Promise<CreateUserResponse>;
  disconnect(payload: DisconnectRequest): Promise<DisconnectResponse>;
}
