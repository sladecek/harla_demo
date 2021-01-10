#!/usr/bin/env node
"use strict";

const fs= require("fs");
const args = require("../src/args");
const photo = require("../src/photo");
const harmony = require("../src/harmony");
const zk = require("../src/zk");
const pki = require("../src/pki");
const repo = require("../src/repo");

const main = () => {
    const para = args.parse();
    args.print(para); 
    const ph = photo.load(para.p);
    
    let walletCfg = JSON.parse(fs.readFileSync(para.wallet));
    let pkiCfg = JSON.parse(fs.readFileSync(para.pki));
    let repoCfg = JSON.parse(fs.readFileSync(para.repo));
    harmony.deployContract(walletCfg, ph.sha256, (contractAddr) => {
	console.log("ContractAddress       :", contractAddr);
	const contractAddrDec = BigInt(contractAddr).toString(10)
	console.log("ContractAddress       :", contractAddrDec);
	zk.computeProverKey(para.d, ph.sha256, contractAddrDec, (nonce, proverKey) => {
	    console.log("Nonce (secret key)   :", nonce);
	    console.log("ProverKey (public key)  :", proverKey);
	    const photoWithKey = { ...ph, 'proverKey': proverKey.toString(10) };
	    const workFile = '../tmp/'+contractAddr;
	    pki.signPhoto(pkiCfg, photoWithKey, workFile, () => {
		repo.upload(repoCfg, contractAddr + ".txt", () => {
		    //  zk.generate_proof
		    //  harmony. upload_feedback
		    process.exit(0);
		});
	    });
	});
    });
    
    
};

main();
