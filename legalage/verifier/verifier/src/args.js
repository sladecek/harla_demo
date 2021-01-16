"use strict";

const yargs = require( "yargs/yargs" );
const { hideBin } = require('yargs/helpers')

module.exports.parse = () => {
    return yargs(hideBin(process.argv))
	.option('today', {
	    demandOption: "Today date must be provided",
	    description: 'Today date in YYYY-MM-DD format.'
	})
	.coerce('today', (arg) => {
	    const jd = Date.parse(arg)/86400000 + 2440587;
	    console.log(arg);
	    if (arg.length != 10 || jd < 2415020 || jd > 2469807) {
		console.log("Date must be in YYYY-MM-DD format.");
		throw {};
	    }
	    return jd
	})
	.option('qr', {
	    description: 'Input file containg QR code content.',
	    default: 'proof.json'
	})
	.option('fb', {
	    alias: 'feedback',
	    description: 'Feedback type: 1=(OK) the person was identified; 2=(NI) this is a different person; 3=(UNK) cannot tell',
	    choices: [1,2,3]	    
	})
	.option('pki', {
	    description: 'Input file containing PKI configuration (signing certificate).',
	    default: 'vpki.json'
	})
	.option('wallet', {
	    description: 'Input file contating wallet configuration.',
	    default: 'vwallet.json'
	})
	.option('repo', {
	    description: 'Input file contating repo configuration.',
	    default: 'vrepo.json'
	})
	.argv
    
}

module.exports.print = (para) => {
    console.log("QR                     :", para.qr);
    console.log("Today (jd)             :", para.today);
    if (para.fb) {
	console.log("Feeback                :", para.fb);
    } else {
	console.log("Show photo             :");
    }
    console.log("Wallet                 :", para['wallet']);
    console.log("Repo                   :", para['repo']);
    console.log("PKI                    :", para['pki']);    
}
