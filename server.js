// import all the packages 
const express = require('express');
const path = require('path');
const fs = require('fs');
const noteData = require('./db/db.json');
const PORT = process.env.PORT || 3001;
// create app variable and call express() function so that the whole library basically comes in 
//as a big function so I can execute and put it in the variable
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Routes for homepage and the next page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request for notes
app.get('/api/notes', (req, res) => res.json(noteData));

// POST request for notes
app.post('/api/notes', (req, res) => {
    // Let the client know that their POST request was received
    res.json(`${req.method} request received`);

    // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save notes
    var newNote = {
      title,
      text,
    };
  }


});


// listening, at which port to listen (this case is 3001)
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
