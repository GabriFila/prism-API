import { server } from "../../../src/server";
import * as chai from "chai";

import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const should = chai.should();

describe("on /prismState/motors", () => {
  it("PUT correct", done => {
    chai
      .request(server)
      .put("/prismState/motors/z")
      .set("Content-Type", "application/json")
      .send({
        newValue: 5
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("newValue");
        expect(res.body.newValue).to.be.equal(5);
        done();
      });
  });

  it("PUT wrong axis", done => {
    chai
      .request(server)
      .put("/prismState/motors/r")
      .set("Content-Type", "application/json")
      .send({
        newValue: 5
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error).to.be.equal("r is invalid for axis");
        done();
      });
  });

  it("PUT no newValue field", done => {
    chai
      .request(server)
      .put("/prismState/motors/r")
      .set("Content-Type", "application/json")
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error).to.be.equal("No newValue field in request body");
        done();
      });
  });
});
