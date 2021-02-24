const express = require('express'); //requiring express up here

const PORT = process.env.PORT || 3001;
const app = express(); ///instantiating the server here

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());




const myNotes = require('./db/db'); ///maybe i dont need to format it like { myNotes }???

function filterByQuery (query, notesArray) {
    let filteredResults = notesArray

    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title)
    }

    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text)
    }

    return filteredResults ////http://localhost:3001/api/db?title=Erica
}


app.get('/api/db', (req, res) => {
  //  res.json(myNotes); /// can see data at http://localhost:3001/api/db
    //res.send('testing')
    let results = myNotes
   
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
})

app.get('/api/db/:noteTitle', (req, res)=> {
    const id = req.params.noteTitle
    let myNote = myNotes[id]
    res.json(myNote) ///example URL: http://localhost:3001/api/db/2
})

app.post('/api/db', (req, res) => {
     // req.body is where our incoming content will be
  console.log(req.body); //req.body property is where our incoming content will be.
  res.json(req.body);
})


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });
//heroku link: https://limitless-coast-45003.herokuapp.com/ 
