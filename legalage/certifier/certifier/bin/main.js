#!/usr/bin/env node
"use strict";

const args = require( "../src/args" );
const photo = require( "../src/photo" );

const main = () => {
    const para = args.parse();
    args.print(para);
    const ph = photo.load(para.p);

};

main();
