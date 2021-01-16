"use strict";

const { ContractFactory } = require('@harmony-js/contract');
const { Wallet } = require('@harmony-js/account');
const { Messenger, HttpProvider } = require('@harmony-js/network');
const { ChainID, ChainType, hexToNumber } = require('@harmony-js/utils');
const { Harmony } = require("@harmony-js/core");
const bs58 = require('bs58')


module.exports.uploadProofOfAgeVerification = async (params, feedback, contractAddr, photoHash, proverKey, proof, handler) => {
    console.log("--Uploading PoAV--");

    const hmy = new Harmony("https://api.s0.b.hmny.io", {
	chainType: ChainType.Harmony,
	chainId: ChainID.HmyTestnet,
    });
    const contractJson = require("../../sol/build/contracts/Poav.json");
    const contract = hmy.contracts.createContract(contractJson.abi, contractAddr);

    const optGuess = { gasPrice: params.gasPrice1 };
    let optRun = { gasPrice: params.gasPrice2, gasLimit: params.gasLimit }; 

    contract.wallet.addByPrivateKey(params.privateKey);

    const proverKeyHex = "0x"+BigInt(proverKey).toString(16);
    const bytes = bs58.decode(proof.proof);
    const zkProof = "0x"+bytes.toString('hex');
    
    contract.methods.recordProof(
	feedback, zkProof, proof.delta, proof.today, proof.is_younger, proverKeyHex
    )
    .estimateGas(optGuess).then(gas => {
	optRun = {...optRun, gasLimit: hexToNumber(gas)};	
	contract.methods.recordProof(
	    feedback, zkProof, proof.delta, proof.today, proof.is_younger, proverKeyHex
	)
        .send(optRun)
	    .then(response => {
		console.log("--Receipt--");
	    console.log(response.transaction.receipt);
	    process.exit(0);
	})
	.catch((error) => {
	    console.error(error);
	});
    })
    .catch((error) => {
	console.error(error);
    });
}
