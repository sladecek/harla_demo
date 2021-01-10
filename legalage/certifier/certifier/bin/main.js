#!/usr/bin/env node
"use strict";

const fs= require("fs");
const args = require("../src/args");
const photo = require("../src/photo");
const harmony = require("../src/harmony");
const zk = require("../src/zk");

const main = () => {
    const para = args.parse();
    args.print(para); 
    const ph = photo.load(para.p);
    let wallet = JSON.parse(fs.readFileSync(para.wallet));
    harmony.deployContract(wallet, ph.hash, (contractAddr) => {
	console.log("ContractAddress    :", contractAddr);
	zk.computeProverKey(para.d, ph.hash, contractAddr, (nonce, proverKey) => {
	    console.log("Nonce (secret key)    :", nonce);
	    console.log("ProverKey (public key)    :", proverKey);
	    process.exit(0);
	});
    });
    
    
};

main();
