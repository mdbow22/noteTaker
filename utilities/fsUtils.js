//Require fs and util modules built into node
const fs = require('fs');

//convert JSON info to string and write to a file
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const addDatatoJSON = (content, file) => {
    //read the file you're adding data to first
    fs.readFile(file, 'utf8', (err,data) => {
        //if it erros, show in console
        if(err) {
            console.error(err);
        } else {
            //else parse data into JS syntax
            const info = JSON.parse(data);
            //push content to the array
            info.push(content);
            //write over file with new array that has new info
            writeToFile(file, info);
        }
    });
};

module.exports = {writeToFile, addDatatoJSON};