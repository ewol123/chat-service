import { PingResponse } from "./args/PingResponse";

export interface ICommonService {
    ping(): PingResponse
}