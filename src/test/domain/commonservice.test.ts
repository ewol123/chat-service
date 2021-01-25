import { assert, expect } from "chai";

import { CommonService } from "../../domain/services/common/CommonService";
import { PingResponse } from "../../domain/services/common/args/PingResponse";

describe("CommonService", () => {
  const service = new CommonService();
  it("should create a new instance", (done) => {
    assert.instanceOf(service, CommonService);
    done();
  });
  describe("ping", () => {
   it("should return PingResponse", (done) =>{
    const response = service.ping();
    assert.instanceOf(response,PingResponse);
    expect(response.status).to.equal("OK");
    done();
   });
  });
 
});
