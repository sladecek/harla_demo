"use strict";

const fs = require('fs');
const sharp = require( "sharp" );
const crypto = require('crypto');

module.exports.load = (fileName) => {
    console.log("--Checking photo--");
    var buf = fs.readFileSync(fileName);
    var img = sharp(buf);
    img.metadata((err, i) => {
	console.log("width: " + i.width + " height: " + i.height);
	if (i.width < 200 || i.width > 2400 || i.height < 240 || i.height > 3600) {
	    console.log("Invalid size. Must be between 200x240 and 2400x3600"); 
	    throw "";
	}
    });
    var hexStr = crypto.createHash("sha256").update(buf).digest('hex');
    console.log(hexStr);
    if (hexStr.length > 24) {
	hexStr = hexStr.substring(hexStr.length - 24);
    }
    console.log(hexStr);
    const hash = BigInt("0x"+hexStr).toString(10);
    console.log("Photo hash (dec)       : " + hash);
    return { "sha256": hash };
}
