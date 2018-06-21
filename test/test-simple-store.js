import Web3 from "web3";
import "babel-polyfill";
import assert from "assert";

import {
  deploy
} from "./utils";

describe("SimpleStore", function() {
  var contract;
  var web3;

  beforeEach(async function() {
    web3 = new Web3("http://localhost:8545");
    contract = await deploy(web3, "SimpleStore");
  });

  describe("#setValue", function() {
    it("sets the value", async () => {
      await contract.methods.setValue("test").send();

      assert.equal(await contract.methods.getValue().call(), "test");
    });
  });
});
