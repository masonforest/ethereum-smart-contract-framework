import Web3 from "web3";
import path from "path";
import fs from "fs";
import solc from "solc";

const defaultContractOptions = {
  gasPrice: 100000000000,
  gas: 712388,
}

export async function deploy(web3, contractName) {
    let fileName = `${contractName}.sol`;
    let contractsDir = path.resolve(__dirname, "..", "contracts");
    let content = fs.readFileSync(`/${contractsDir}/${fileName}`).toString();
    let sources = {
      [fileName]: content
    };

    const output = solc.compile({sources}, 1, (dependencyPath) => {
      let npmPath  = path.resolve(process.cwd(), "node_modules", dependencyPath)
      if(fs.existsSync(npmPath)) {
        return { contents: fs.readFileSync(npmPath).toString() }
      }
    });
    let bytecode = output.contracts[`${fileName}:${contractName}`].bytecode
    let {abi} = JSON.parse(output.contracts[`${fileName}:${contractName}`].metadata).output;
    let accounts = await web3.eth.getAccounts();
    let contract = await (new web3.eth.Contract(abi)).deploy({
      data: bytecode,
    }).send({
      ...defaultContractOptions,
      from: accounts[0],
    });
    contract.options.from = accounts[0];

    return contract;
}
