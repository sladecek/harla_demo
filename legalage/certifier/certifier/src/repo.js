"use strict";

const fs= require("fs");
const jsftp = require("jsftp");

module.exports.upload = (cfg, fileName, handler) => {
    console.log("--Upload to repo--");

    var buf = fs.readFileSync("../tmp/"+fileName);
    const ftp = new jsftp({...cfg});
    ftp.put(buf, "/htdocs/photo/"+fileName, err => {
	if (err) {
	    console.log("File transferr error "+err);
	    throw "";
	}
	handler();
    });

}




