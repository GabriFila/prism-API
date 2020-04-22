"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../../../../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const should = chai.should();
describe("On /scanParams", () => {
    it("GET correct", done => {
        chai
            .request(server_1.server)
            .get("/prismState/scanParams/")
            .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
});
//# sourceMappingURL=onScanParams.test.js.map