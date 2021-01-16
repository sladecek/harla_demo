#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const args = require("../src/args");
const photo = require("../src/photo");
const harmony = require("../src/harmony");
const zk = require("../src/zk");
const pki = require("../src/pki");
const repo = require("../src/repo");

const bigint_le = (s0x) => {
    const rev = Buffer.from(s0x.substr(2),'hex').reverse();
    return BigInt('0x' + rev.toString('hex')).toString(10);
};

const main = () => {
    const para = args.parse();
    args.print(para); 
    
    let walletCfg = JSON.parse(fs.readFileSync(para.wallet));
    let pkiCfg = JSON.parse(fs.readFileSync(para.pki));
    let repoCfg = JSON.parse(fs.readFileSync(para.repo));

    const ph = photo.load(para.p);
    harmony.deployContract(walletCfg, ph.sha256, (contractAddr) => {
	console.log("ContractAddress       :", contractAddr);

	const contractAddrDec = bigint_le(contractAddr);
	console.log("ContractAddress       :", contractAddrDec);
	zk.computeProverKey(para.d, ph.sha256, contractAddrDec, (nonce, proverKey) => {
	    console.log("Nonce (secret key)   :", nonce);
	    console.log("ProverKey (public key)  :", proverKey);
	    const photoWithKey = { ...ph, 'proverKey': proverKey.toString(10) };
	    const workFile = '../tmp/'+contractAddr;
	    pki.signPhoto(pkiCfg, photoWithKey, workFile, () => {
		const ext = path.extname(para.p);
		repo.upload(repoCfg, para.p, "photo/" + contractAddr  + ext, () => {
		    repo.upload(repoCfg, workFile + ".txt", "signature/" + contractAddr + ".txt", () => {
			const proverDbFile = zk.saveProverDb(para, contractAddrDec, ph, nonce);
			console.log("-----FINISHED----");
			process.exit(0);
		    });
		});
	    });
	});
    });   
};

main();
