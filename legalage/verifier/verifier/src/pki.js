"use strict";

const fs= require("fs");
var chp = require('child_process');

module.exports.signPhoto = (cfg, photoWithKey, outputFile, handler) => {
    console.log("--PKI signature of the photo--");
    const data = JSON.stringify(photoWithKey);
    fs.writeFileSync(outputFile + ".json", data);   

    chp.execFile("openssl", [
	"cms",
	"-sign",
	"-in", outputFile + ".json",
	"-out", outputFile + ".txt",
	"-outform", "smime",
	"-signer", cfg.signer,
	"-passin", "pass:" + cfg.password,
	"-inkey", cfg.key,
    ], [], (error, stdout) => {
	if (error) {
	    console.log("Error executing 'openssl'" + error);
	    throw "";
	}
        const result = stdout.toString();
	console.log(result); // TODO smazat
	handler();
    });
}
