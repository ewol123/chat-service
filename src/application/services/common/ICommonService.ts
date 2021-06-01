import { PingResponse } from "./dto/PingResponse";

export interface ICommonService {
    ping(): PingResponse
}