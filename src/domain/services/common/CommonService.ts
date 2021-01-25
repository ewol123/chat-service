import { ICommonService } from "./ICommonService";
import { PingResponse } from "./args/PingResponse";

export class CommonService implements ICommonService {
    ping(): PingResponse {
        return  new PingResponse()
    }
}