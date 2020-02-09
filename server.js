'use strict';
require('dotenv').config();

const pg = require('pg');
const superagent = require('superagent');
const express = require('express');
const app = express();

const client = new pg.Client(process.env.DATABASE_URL);

app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// ROUTES //
//Render home page
// app.get('/', (req, res) => {
//   res.render('pages/index.ejs');
// });

// Render saved list to home page
app.get('/', savedRender);

app.get('/searches/new', (req, res) => {
  res.render('pages/searches/new.ejs');
})

app.get('/searches/show', (req, res) => {
  res.render('pages/searches/show.ejs');
})

app.post('/searches', searchHandler);

//Route Button to Save From Search
app.post('/show', saveFromSearch);

//BOOK CONSTRUCTOR OBJ
function Book(data){
  this.title = data.title ? data.title : 'No title available';
  this.author = data.authors ? data.authors.join(', ') : 'No author available';
  this.description = data.description ? data.description : 'No description available';
  this.image = data.imageLinks ? data.imageLinks.thumbnail : 'https://static1.fjcdn.com/comments/404+funny+not+found+inb4+its+already+been+_001ff3344783fb5362fd5d596d4f7e0c.jpg';
  this.isbn = data.industryIdentifiers ? data.industryIdentifiers[0].identifier : 'No ISBN available';


//Should push book item to DB from search results
function saveFromSearch (request, response) {
  console.log('request fron save fn', request);
  let SQL = `
  INSERT INTO books (title, author, isbn, image_url, description)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  let values = [request.body.title, request.body.author, request.body.isbn, request.body.image_url, request.body.description];

  client.query(SQL, values)
    .then(results => {
      response.render('/show.ejs', { books: results.rows[0]})
      response.redirect('/');
    });
}

//should render saved list to homepage
function savedRender (request, response) {
  let SQL = `SELECT * FROM books;`;
  client.query(SQL)
    .then (results => {
      console.log('results rows ',results.rows);
      response.render('pages/index.ejs', {books: results.rows})
    })
}

function searchHandler (request, response) {
  try {
    let url = `https://www.googleapis.com/books/v1/volumes?q=`;
    console.log(request.body);

    if (request.body.searchby === 'title') { url += `+intitle:${request.body.search}`; }
    if (request.body.searchby === 'author') { url += `+inauthor:${request.body.search}`; }

    console.log(url);
    superagent.get(url)
      .then(console.log('I am here'))
      .then(apiResponse => apiResponse.body.items.map(bookResult => { return new Book(bookResult.volumeInfo)}) )
      .then(console.log('bookResult'))
      .then(results => response.render('pages/searches/show.ejs', {books: results}))
      .then(console.log('lastLine'))
  }
  catch (error){
    errorHandler('something went wrong w the searchhandler', request, response);
  }
}

//ERROR HANDLER
function errorHandler(error, request, response) {
  response.status(500).send(error);
}

client.connect()
  .then(() => {
    app.listen(process.env.PORT, () => console.log(`up on ${process.env.PORT}`));
  })
  .catch(() => console.log('port client issue'));

