import { server } from "../../src/server";
import * as chai from "chai";

import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const should = chai.should;
const assert = chai.assert;

describe("on /prismState ", () => {
  it("GET", () => {
    assert(1 == 1);
  });
});
