import { server } from "../../../../src/server";
import * as chai from "chai";

import chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("On /scanParams", () => {
  it("GET correct", done => {
    chai
      .request(server)
      .get("/prismState/scanParams/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
