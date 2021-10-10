//modules to require
const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

//Middleware for parsing data sent
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Allow static files in the public folder
app.use(express.static('public'));

//GET route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET route for notes page
app.get('/notes', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () => 
    console.log(`App listening on port ${PORT}`)
);