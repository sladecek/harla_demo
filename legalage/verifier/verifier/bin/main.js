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

const main = () => {
    const para = args.parse();
    args.print(para); 
    const walletCfg = JSON.parse(fs.readFileSync(para.wallet));
    const pkiCfg = JSON.parse(fs.readFileSync(para.pki));
    const repoCfg = JSON.parse(fs.readFileSync(para.repo));

    console.log("Parsing proof");
    const proof = JSON.parse(fs.readFileSync(para.qr));
    const contract = proof.contract;

    const photoTmpFile = "../tmp/tmp.photo";
    const sigTmpFile = "../tmp/tmp.p7s";
    const verifiedSigFile = "../tmp/tmp.json";
    const photoName = contract+".png";
    repo.downloadPhoto(repoCfg, photoName, photoTmpFile, ()=>{
	const ph = photo.load(photoTmpFile);
	repo.downloadSignature(repoCfg, contract+".txt", sigTmpFile, ()=>{
	    console.log("Checking PKI signature       :");
	    pki.validateSignature(pkiCfg, sigTmpFile, verifiedSigFile, () => {
		const sigFile = JSON.parse(fs.readFileSync(verifiedSigFile));
		console.log("Checking photo hash       :");
		if (sigFile.sha256 != ph.sha256) {
		    console.log("Wrong photo!       :");
		    process.exit(0);
		}
		if (!para.fb) {
		    // Proof verification phase
		    zk.verifyProof(para.qr, sigFile.sha256, sigFile.proverKey, (ok) =>{
			if (ok) {
			    const relStr = proof.is_younger ? "YOUNGER" : "OLDER";
			    const years = Math.round(proof.delta / 365.25);
			    console.log("\nThe proof claims that the person is "+relStr+" than "+years+" years.\n");
			    console.log("The proof was generated "+(para.today- proof.today)+" days ago.\n");
			    
			    console.log("\nPROOF CHECKS PASSED\nNow Check photo at the URL and then provide feedback " + repoCfg.photo_url + photoName);
			    process.exit(0);
			} else {
			    console.log("\n\nPROOF CHECKS DIDN'T PASS");
			}
		    });
		} else {
		    // Feedback upload
		    harmony.uploadProofOfAgeVerification(walletCfg, para.fb, contract, ph.sha256, sigFile.proverKey, proof, () => { 
			console.log("-----FINISHED----");
			process.exit(0);
		    }).catch((error) => {
			console.error(error);
		    });
		    
		};
	    });
	});
    });    
};

main();
