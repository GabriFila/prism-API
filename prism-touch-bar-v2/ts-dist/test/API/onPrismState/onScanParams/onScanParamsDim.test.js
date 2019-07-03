"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
describe("On /scanParams/:dim", () => {
    it("PUT correct", done => {
        chai
            .request(server_1.server)
            .put("/prismState/scanParams/dwellTime")
            .set("Content-Type", "application/json")
            .send({
            newValue: 20
        })
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("newValue");
            expect(res.body.newValue).to.be.equal(20);
            done();
        });
    });
    it("PUT no newValue field in body", done => {
        chai
            .request(server_1.server)
            .put("/prismState/scanParams/dwellTime")
            .set("Content-Type", "application/json")
            .send({})
            .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.error).to.be.equal("No newValue field in request body");
            done();
        });
    });
    it("PUT wrong :dim", done => {
        chai
            .request(server_1.server)
            .put("/prismState/scanParams/wrong")
            .set("Content-Type", "application/json")
            .send({
            newValue: 20
        })
            .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.error).to.be.equal("wrong is an invalid resource");
            done();
        });
    });
    it("PUT negative newValue", done => {
        chai
            .request(server_1.server)
            .put("/prismState/scanParams/dwellTime")
            .set("Content-Type", "application/json")
            .send({
            newValue: -20
        })
            .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.error).to.be.equal("-20 is non valid for scanParams-dwellTime");
            done();
        });
    });
});
//# sourceMappingURL=onScanParamsDim.test.js.map