"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
describe("on /mode ", () => {
    it("GET correct", done => {
        chai
            .request(server_1.server)
            .get("/prismState/mode")
            .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
    it("PUT correct", done => {
        chai
            .request(server_1.server)
            .put("/prismState/mode")
            .set("Content-Type", "application/json")
            .send({
            newValue: "live"
        })
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("newValue");
            expect(res.body.newValue).to.be.equal("live");
            done();
        });
    });
    it("PUT no newValue field", done => {
        chai
            .request(server_1.server)
            .put("/prismState/mode")
            .set("Content-Type", "application/json")
            .send({})
            .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.error).to.be.equal("No newValue field in request body");
            done();
        });
    });
    it("PUT invalid newValue field", done => {
        chai
            .request(server_1.server)
            .put("/prismState/mode")
            .set("Content-Type", "application/json")
            .send({
            newValue: "wrong"
        })
            .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.error).to.be.equal("wrong is invalid for mode");
            done();
        });
    });
});
//# sourceMappingURL=onMode.test.js.map