// import all the packages 
const express = require('express');
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

let noteData = require('./db/db.json');
const PORT = process.env.PORT || 3001;

// Initialize Express package
// create app variable and call express() function so that the whole library basically comes in 
//as a big function so I can execute and put it in the variable
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Routes for homepage and the next page (notes page)
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
  let newNote = {};
  if (title && text) {
    // Variable for the object we will save notes
    newNote = {
      title,
      text,
      // Generate specific id for notes
      id: uuidv4(),
    };
    console.log(newNote);
  }
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      noteData = JSON.parse(data);
      // Add a new note
      noteData.push(newNote);

      // Write updated notes
      fs.writeFile(
        './db/db.json',
        JSON.stringify(noteData, null),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated notes!')
      );
    }

  });
});
// Delete notes
app.delete("/api/notes/:id", (req, res) => {
  let noteId = req.params.id;
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      noteId = JSON.parse(data);
      // Remove a note and make a new array
      noteId.filter(newArrNote);

      // Write updated notes
      fs.writeFile(
        './db/db.json',
        JSON.stringify(noteData, null),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated notes!')
      );
    }

  });
  
})





// listening, at which port to listen (this case is 3001)
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
