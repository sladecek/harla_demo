"use strict";

const fs= require("fs");
const chp = require('child_process');

module.exports.computeProverKey = (birthday, photoHash, contract, handler) => {
    console.log("--Invoking prover key computation--");
    chp.execFile("../bin/certifier-zk", [birthday, photoHash, contract], [], (error, stdout) => {
	if (error) {
            console.log("Error executing 'certifier-zk'" + error);
	    throw "";
	}
        const result = stdout.toString();
	const numbers = result.split(' ').map((s)=>{return BigInt(s);})
	if (numbers.length != 2 || !numbers[0] || !numbers[1]) {
            console.log("Internal error parsing result of 'certifier-zk'");
	    throw "";
	}
	handler(numbers[0], numbers[1]);
    });
}

module.exports.saveProverDb = (para, contractAddrDec, ph, nonce) => {
    const proverDb = {
	"birthday": para.d,
	"contract": contractAddrDec,
	"photo_hash": ph.sha256.toString(10),
	"nonce": nonce.toString(10)
    };
    const proverDbFile = para['prover-db'];
    fs.writeFileSync(proverDbFile, JSON.stringify(proverDb));   
    return proverDbFile;
}

module.exports.verifyProof = (qrJsonFile, photoHash, proverKey, handler) => {
    console.log("--Invoking proof verification--");
    chp.execFile("../bin/verifier-zk", [qrJsonFile, photoHash, proverKey], [], (error, stdout) => {
	if (error) {
            console.log("Error executing 'verifier-zk'" + error);
	    throw "";
	}
        const result = stdout.toString();
	handler(Number(result));
    });
}

