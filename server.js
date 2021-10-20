// import all the packages 
const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
// create app variable and call express() function so that the whole library basically comes in 
//as a big function so I can execute and put it in the variable
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// listening, at which port to listen (this case is 3001)
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
