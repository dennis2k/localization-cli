#!/usr/bin/env node

let init = false;
process.argv.forEach((val, index) => {
  if(val === "init")
      init = true;
});

if(init) 
    require("./init");
else
    require("./export");

