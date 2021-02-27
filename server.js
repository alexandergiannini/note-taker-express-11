const express = require('express'); //requiring express up here

const PORT = process.env.PORT || 3001;
const app = express(); ///instantiating the server here

const path = require('path'); //requiring the path here

const fs = require('fs'); ///requiring FS here

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('public')); //using this to access other files in public folder


let myNotes =  []/// this empty array runs through the clientside, and we use it to db.json
//require('./db/db'); ///maybe i dont need to format it like { myNotes }???

///function that filters query search within the URL/notes page.
function filterByQuery (query, notesArray) {
    let filteredResults = notesArray;

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title); ///this takes account the title propery on db.json file
    }

    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text); //////this takes account the text propery on db.json file
    }

    return filteredResults ;

    ////http://localhost:3001/api/notes?title=Erica
    //http://localhost:3001/api/notes?title=Test%20Title
    ///http://localhost:3001/api/notes?text=Test%20text
}


//not used so far...
function createNewNote (body, notesArray) {
    console.log(body);
    return body;
}

/// creating a get html path to the index.html page
app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, './public/index.html') ///http://localhost:3001/
    )
})

/// creating a get html path here to the notes.html page
app.get('/notes', (req, res) => {
    res.sendFile(
        path.join(__dirname, './public/notes.html')
    )
})

// creating an api route which reads the db.json file and returns all the notes saved as a JSON
app.get('/api/notes', (req, res) => {
 
    //let results = myNotes;

    let results;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            throw err
        } else {
            myNotes = JSON.parse(data) || [] //data is a string, and coverts data into an object/string
            results = myNotes

            if (req.query) {
                results = filterByQuery(req.query, results);
            }
            res.json(results);
        }
    })
   
    
})

// creating an api route which displays in ID(?) within the URL
app.get('/api/notes/:noteTitle', (req, res)=> {
    const id = req.params.noteTitle;
    let myNote = myNotes[id];
    res.json(myNote); ///example URL: http://localhost:3001/api/notes/1
})


/////// !!! i need to be able to store an ID here when saving a new note
//POST api route which receives a new note to save and displays it on the db.json and returns the new note to the client
app.post('/api/notes', (req, res) => {
     // req.body is where our incoming content will be
  //console.log(req.body); //req.body property is where our incoming content will be.
  //req.body.id = myNotes.length.toString();

  let newNote = req.body;
  newNote.id = myNotes.length.toString();
  myNotes.push(newNote);

  fs.writeFile('./db/db.json', JSON.stringify(myNotes), (err) => {
    if (err) {
        throw err
    } else {
       console.log('this works!') 
    }
  })
  res.json(myNotes);
})

///app listen method
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });
//heroku link: https://limitless-coast-45003.herokuapp.com/ 
