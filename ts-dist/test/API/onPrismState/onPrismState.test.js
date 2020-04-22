"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();
describe("on /prismState ", () => {
    it("GET", done => {
        chai
            .request(server_1.server)
            .get("/prismState")
            .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
//# sourceMappingURL=onPrismState.test.js.map