//make this file a router
const routes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

//import fs functions
const {writeToFile, addDatatoJSON} = require('../utilities/fsUtils');

routes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    });
});

routes.post('/', (req, res) => {
    const {title, text} = req.body;

    //verify that both title and text are present on request
    if(title && text) {
        //create a new object to store note info
        const newNote = {
            title,
            text,
            id: uuidv4()
        };
        //add note to database
        addDatatoJSON(newNote, './db/db.json');
        res.json('Note added')
    } else {
        res.json('title or text were missing');
    }
});

module.exports = routes;