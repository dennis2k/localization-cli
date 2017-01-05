const fs = require('fs');
const prompt = require('prompt');

let schema = {
    properties: {
      token: {
        message: 'API token from your account',
        required: true
      },
      project: {
        message: 'Project id'
        required: true
      },
      project: {
        message: 'Format of the output'
        required: true,
        default: "json"
      },
      destination: {
        message: "Location of the files",
        requied: true,
        default: "./"
      }
    }
  };
prompt.start();

//
// Get two properties from the user: username and email
//
prompt.get(schema, (err, result) => {
    if(err) {
        console.log("Error occured")
        process.exit()
    }
    let inputs = {
        token : result.token,
        project : result.project,
        format : result.format,
        destination : result.destination
    }
    
    fs.writeFile("./l4n.json",JSON.stringify(inputs), (err) => {
        if(err) {
            console.log("Error occured while creating file")
            process.exit()
        }
        console.log("Config file created !");
        process.exit()
    }); 
});