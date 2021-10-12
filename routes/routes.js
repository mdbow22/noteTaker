//make this file a router
const routes = require('express').Router();
const fs = require('fs');
const { parse } = require('path');
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

routes.delete('/:id', (req, res) => {
    //get id of note needing deleted
    const noteID = req.params.id;
    
    //read database file
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            //parse JSON
            const db = JSON.parse(data);
            //find id in file
            const noteIndex = db.map(e => e.id).indexOf(noteID);
            //splice that index from array
            if(noteIndex > -1) {
                db.splice(noteIndex, 1);
                //rewrite file with remaining notes
                writeToFile('./db/db.json',db);
                res.json('note successfully deleted');
            } else {
                //if ID was not in array, respond that that note doesn't exist
                res.json('note not found');
            }
        }
    });
});

module.exports = routes;