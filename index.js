#!/usr/bin/env node
var fs = require('fs');
var Download = require('download');
var commandLineArgs = require('command-line-args');
var prompt = require('prompt');

var cli = commandLineArgs([
  { name: 'token', alias: 't', type: String },
  { name: 'destination', alias : 'd', type: String },
  { name: 'overwrite', alias: 'o', type: Boolean },
  { name: 'format', alias: 'f', type: String },
  { name: 'project', alias: 'p', type: String },
  { name: 'config_file', alias: 'c', type: String }
])

if(process.argv.length > 2) {
    if(process.argv[2] == "init") {
            prompt.start();

            //
            // Get two properties from the user: username and email
            //
            prompt.get(['token','project','destination','format'], function (err, result) {
                if(err) {
                    console.log("Error occured")
                    process.exit()
                }
                var inputs = {
                    token : result.token,
                    project : result.project,
                    format : result.format,
                    destination : result.destination
                }
                
                fs.writeFile("./l4n.json",JSON.stringify(inputs), function(err) {
                    if(err) {
                        console.log("Error occured while creating file")
                        process.exit()
                    }
                    console.log("Config file created !");
                }); 
            });
    }
}

if(process.argv.length <= 2 || (process.argv.length > 2 && process.argv[2] != "init")) {
    
//Parse input params
var args = cli.parse();

//Default look for config file in current directory
var config_file = 'l4n.json';

//If another config is specified as input param we use that instead
if(args.config_file)
    config_file = args.config_file

var config = {};
try {
    var config = JSON.parse(fs.readFileSync(config_file, 'utf8'));
} catch (error) {
    console.error("Unable to load file at " + config_file);
    //Cannot load file   
}
    
//Overwrite configs 
if(args.token) config.token = args.token;
if(args.destination) config.destination = args.destination;
if(args.project) config.project = args.project;
if(args.format) config.format = args.format;

//Check if configs is set
if(!config.token) console.error("Missing token") 
if(!config.destination) console.error("Missing destination") 
if(!config.project) console.error("Missing project") 
if(!config.format) console.error("Missing format")

var src = "http://178.62.180.69:8080/api/v1/projects/" + config.project + "/export/" + config.format + "?token=" + config.token
new Download({mode: '755', extract : true})
        .get(src)
        .dest(config.destination)
        .run();

   
}