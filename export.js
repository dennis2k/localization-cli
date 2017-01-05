const fs = require('fs');
const download = require('download');
const prompt = require('prompt');

const configFile = 'l4n.json';

let config = {};
try {
    config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
} catch (error) {
    console.error("Unable to load file (l4n.json) at " + configFile);
    process.exit();
    //Cannot load file   
}

//Check if configs is set
if(!config.token) console.error("Missing token") 
if(!config.destination) console.error("Missing destination") 
if(!config.project) console.error("Missing project") 
if(!config.format) console.error("Missing format")

let route = ["http://178.62.180.69:8080/api/v1/projects/", config.project, "/export/", config.format, "?token=", config.token];
download(route.join(""), config.destination, {mode: '755', extract : true}):