"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
describe("on prismState/lasers ", () => {
    it("PUT correct", done => {
        chai
            .request(server_1.server)
            .put("/prismState/lasers/power?waveLength=300")
            .set("Content-Type", "application/json")
            .send({
            newValue: 70
        })
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("newValue");
            expect(res.body.newValue).to.be.equal(70);
            done();
        });
    });
    it("PUT wrong wave length", done => {
        chai
            .request(server_1.server)
            .put("/prismState/lasers/power?waveLength=0")
            .set("Content-Type", "application/json")
            .send({
            newValue: 70
        })
            .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.error).to.be.equal("No laser with wavelength 0 nm");
            done();
        });
    });
    it("PUT wrong param", done => {
        chai
            .request(server_1.server)
            .put("/prismState/lasers/45?waveLength=300")
            .set("Content-Type", "application/json")
            .send({
            newValue: 70
        })
            .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.error).to.be.equal("45 is not a valid url parameter");
            done();
        });
    });
    it("PUT invalid isOn value", done => {
        chai
            .request(server_1.server)
            .put("/prismState/lasers/isOn?waveLength=300")
            .set("Content-Type", "application/json")
            .send({
            newValue: 66
        })
            .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.error).to.be.equal("66 is not boolean");
            done();
        });
    });
    it("PUT invalid power value", done => {
        chai
            .request(server_1.server)
            .put("/prismState/lasers/power?waveLength=300")
            .set("Content-Type", "application/json")
            .send({
            newValue: true
        })
            .end((err, res) => {
            res.should.have.status(400);
            expect(res.body.error).to.be.equal("true is not a number");
            done();
        });
    });
});
//# sourceMappingURL=onLasers.test.js.map