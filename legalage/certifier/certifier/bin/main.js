#!/usr/bin/env node
"use strict";

const args = require( "../src/args" );

const main = () => {
    const para = args.parse();
    args.print(para);
};

main();
