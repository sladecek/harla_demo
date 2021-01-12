"use strict";

const fs= require("fs");
const jsftp = require("jsftp");

module.exports.upload = (cfg, src, dest, handler) => {
    console.log("--Upload to repo--");

    var buf = fs.readFileSync(src);
    const ftp = new jsftp({...cfg});
    ftp.put(buf, "/htdocs/"+dest, err => {
	if (err) {
	    console.log("File transferr error "+err);
	    throw "";
	}
	handler();
    });

}




