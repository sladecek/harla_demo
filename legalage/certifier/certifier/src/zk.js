"use strict";

var chp = require('child_process');

module.exports.computeProverKey = (birthday, photoHash, contract, handler) => {
    console.log("--Invoking prover key computation--");
    chp.exec("../bin/certifier-zk", [birthday, photoHash, contract], (error, stdout) => {
	if (error) {
            console.log("Error executing 'certifier-zk'" + error);
	    throw "";
	}
        const result = stdout.toString();
	console.log(result); // TODO smazat
	const numbers = result.split(' ').map((s)=>{return BigInt(s);})
	if (numbers.length != 2 || !numbers[0] || !numbers[1]) {
            console.log("Internal error parsing result of 'certifier-zk'");
	    throw "";
	}
	handler(numbers[0], numbers[1]);
    });
}
