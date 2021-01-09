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
	    const jd = Date.parse(arg)/86400000 + 244058;
	    if (arg.length != 10 || jd < 222222 || jd > 300000) {
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
	.option('pfx', {
	    description: 'File name of a PKCS#12 certificate with a private key to sign the certification.',
	    default: 'certifier.pfx'
	})
	.option('pfx-password', {
	    description:  'PKCS#12 certificate password.',
	    type: 'string',
	    default: '1111'
	})
	.option('prover-db', {
	    description: 'Output file containing prover secrets. To be imported to the mobile app.',
	    default: 'prover-db.json'
	})
	.option('not-before', {
	    description: 'First day of validity of the certification YYYY-MM-DD.',
	    default: 'TODAY'
	})
	.option('not-after', {
	    description: 'Last day of validity of the certification YYYY-MM-DD.',
	    default: 'TODAY+1 year'
	})
	.option('repo', {
	    description: 'Input file contating repository configuration.',
	    default: 'crepo.json'
	})
	.option('wallet', {
	    description: 'Input file contating wallet configuration.',
	    default: 'cwallet.json'
	})
	.option('price', {
	    description: 'Service fee to be demanded from the certifier.',
	    default: 0
	})
	.option('payment-harmony', {
	    description: 'Address for the service fee (Harmony).',
	})
	.option('payment-ethereum', {
	    description: 'Address for the service fee (Ethereum).',
	})
	.argv
    
}

module.exports.print = (para) => {
    console.log("Date of birth (jd)     :", para.d);
    console.log("Photo                  :", para.p);
    console.log("Signing certificate    :", para.pfx);
    console.log("Certificate password   :", para['pfx-password']);
    console.log("Output file            :", para['prover-db']);
    console.log("Not before             :", para['not-before']);
    console.log("Not after              :", para['not-after']);
    console.log("Wallet                 :", para['wallet']);
    console.log("Repo                   :", para['repo']);
    console.log("Price                  :", para['price']);
    console.log("Payment Harmony        :", para['payment-harmony']);
    console.log("Payment Ethereum       :", para['payment-ethereum']);
    
}
