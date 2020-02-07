'use strict';
require('dotenv').config();
const superagent = require('superagent');
const express = require('express');
const app = express();

app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// ROUTES //
app.get('/', (req, res) => {
  res.render('pages/index.ejs');
});

app.get('/searches/new', (req, res) => {
  res.render('pages/searches/new.ejs');
})

app.get('/searches/show', (req, res) => {
  res.render('pages/searches/show.ejs');
})

app.post('/searches', searchHandler);

//BOOK CONSTRUCTOR OBJ
function Book(data){
  this.title = data.title || 'No title available';
  this.author = data.authors || 'No author available';
  this.description = data.description || 'No description available';
  this.image = data.imageLinks.thumbnail || 'No image available';
}

function searchHandler (request, response) {
  try {

    let url = `https://www.googleapis.com/books/v1/volumes?q=`;
    // console.log(request);
    console.log(request.body);

    if (request.body.searchby === 'title') { url += `+intitle:${request.body.search}`; }
    if (request.body.searchby === 'author') { url += `+inauthor:${request.body.search}`; }

    console.log(url);
    superagent.get(url)
      .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)) )
      .then(results => response.render('pages/show', {searchResults: results}));
  }
  catch (error){
    errorHandler('something went wrong w the searchhandler', request, response);
  }
}


//ERROR HANDLER
function errorHandler(error, request, response) {
  response.status(500).send(error);
}

app.listen(process.env.PORT, () => console.log(`up on ${process.env.PORT}`));
