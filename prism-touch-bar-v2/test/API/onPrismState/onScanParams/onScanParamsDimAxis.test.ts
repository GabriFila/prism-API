import { server } from "../../../../src/server";
import * as chai from "chai";

import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;

describe("On /scanParams/:dim/:axis", () => {
  it("PUT correct", done => {
    chai
      .request(server)
      .put("/prismState/scanParams/offset/x")
      .set("Content-Type", "application/json")
      .send({
        newValue: 200
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("newValue");
        expect(res.body.newValue).to.be.equal(200);
        done();
      });
  });

  it("PUT no newValue field in body", done => {
    chai
      .request(server)
      .put("/prismState/scanParams/offset/y")
      .set("Content-Type", "application/json")
      .send({
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error).to.be.equal("No newValue field in request body");

        done();
      });
  });

  it("PUT wrong :dim", done => {
    chai
      .request(server)
      .put("/prismState/scanParams/wrong/x")
      .set("Content-Type", "application/json")
      .send({
        newValue: 20
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error).to.be.equal("wrong is not a valid dimension");

        done();
      });
  });

  it("PUT wrong :axis", done => {
    chai
      .request(server)
      .put("/prismState/scanParams/range/wrong")
      .set("Content-Type", "application/json")
      .send({
        newValue: 20
      })
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.error).to.be.equal("wrong is not a valid axis");

        done();
      });
  });
});
