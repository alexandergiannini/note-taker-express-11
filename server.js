const express = require('express'); //requiring express up here

const PORT = process.env.PORT || 3001;
const app = express(); ///instantiating the server here

const myNotes = require('./db/db'); ///maybe i dont need to format it like { myNotes }???

app.get('/api/db', (req, res) => {
  //  res.json(myNotes); /// can see data at http://localhost:3001/api/db
    //res.send('testing')
    let results = myNotes
    //console.log(req.query)
    res.json(results)
})

app.get('/api/db/:noteTitle', (req, res)=> {
    const id = req.params.noteTitle
    let myNote = myNotes[id]
    res.json(myNote) ///example URL: http://localhost:3001/api/db/2
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });
//heroku link: https://limitless-coast-45003.herokuapp.com/ 
