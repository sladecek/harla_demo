"use strict";

const fs= require("fs");
const jsftp = require("jsftp");
const http = require('http'); 
const request = require('request')


module.exports.upload = (cfg, src, dest, handler) => {
    console.log("--Upload to repo--");

    var buf = fs.readFileSync(src);
    const ftp = new jsftp({...cfg});
    ftp.put(buf, dest, err => {
	if (err) {
	    console.log("File transferr error "+err);
	    throw "";
	}
	handler();
    });
}

module.exports.downloadPhoto = (cfg, src, dest, handler) => {
    const u = cfg.photo_url+src;
    console.log("--Downloading photo--"+u);
    request.head(u, (err, res, body) => {
	request(u)
	    .pipe(fs.createWriteStream(dest))
	    .on('close', handler)
    })
}

module.exports.downloadSignature = (cfg, src, dest, handler) => {
    const u = cfg.signature_url+src;
    console.log("--Downloading signature--"+u);
    request.head(u, (err, res, body) => {
	request(u)
	    .pipe(fs.createWriteStream(dest))
	    .on('close', handler)
    })
}
