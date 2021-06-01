import { ICommonService } from "./ICommonService";
import { PingResponse } from "./dto/PingResponse";

export class CommonService implements ICommonService {
    ping(): PingResponse {
        return  new PingResponse()
    }
}