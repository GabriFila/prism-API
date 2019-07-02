import { server } from "../../src/server";
import * as chai from "chai";

import chaiHttp = require("chai-http");
import { request } from "https";

chai.use(chaiHttp);

const expect = chai.expect;
const should = chai.should();
const assert = chai.assert;

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
