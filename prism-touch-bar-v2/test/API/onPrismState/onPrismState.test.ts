import { server } from "../../../src/server";
import * as chai from "chai";

import chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("on /prismState ", () => {
  it("GET", done => {
    chai
      .request(server)
      .get("/prismState")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
