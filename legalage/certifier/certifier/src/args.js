"use strict";

const yargs = require( "yargs/yargs" );
const { hideBin } = require('yargs/helpers')

module.exports.parse = () => {
    return yargs(hideBin(process.argv))
	.option('d', {
	    alias: ('date-of-birth'),
	    demandOption: "The date of birth must be provided",
	    description: 'Date of birth of the prover in YYYY-MM-DD format.'
	})
	.coerce('d', (arg) => {
	    const jd = Date.parse(arg)/86400000 + 2440587;
	    if (arg.length != 10 || jd < 2415020 || jd > 2469807) {
		console.log("Date must be in YYYY-MM-DD format.");
		throw {};
	    }
	    return jd
	})
	.option('p', {
	    alias: ('photo'),
	    demandOption: "The photo portrait file  must be provided",
	    description: 'File name of a portrait photo (jpg, png).'
	})
	.option('prover-db', {
	    description: 'Output file containing prover secrets. To be imported to the mobile app.',
	    default: 'prover-db.json'
	})
	.option('pki', {
	    description: 'Input file containing PKI configuration (signing certificate).',
	    default: 'cpki.json'
	})
	.option('repo', {
	    description: 'Input file contating repository configuration.',
	    default: 'crepo.json'
	})
	.option('wallet', {
	    description: 'Input file contating wallet configuration.',
	    default: 'cwallet.json'
	})
	.argv
    
}

module.exports.print = (para) => {
    console.log("Date of birth (jd)     :", para.d);
    console.log("Photo                  :", para.p);
    console.log("Output file            :", para['prover-db']);
    console.log("Wallet                 :", para['wallet']);
    console.log("Repo                   :", para['repo']);
    console.log("PKI                    :", para['pki']);
}
