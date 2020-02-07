'use strict';
require('dotenv').config();
const superagent = require('superagent');
const express = require('express');
const app = express();

app.use(express.static('./public'));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('pages/index.ejs');
});

app.get('/searches/new', (req, res) => {
  res.render('pages/searches/new.ejs');
})

// app.get('/searches', (req, res) => {

//   // select * from some database ...
//   let book = {
//     title: 'cool things',
//     author: 'awesome person',
//     img: 'img',
//     description: 'fun book'
//   };


//BOOK CONSTRUCTOR OBJ
function Book(data){
  this.title = data.body.items.volumeinfo.title,
  this.author = data.body.items.volumeinfo.authors[0],
  this.description = data.body.items.volumeinfo.description,
  this.image = data.body.items.volumeinfo.imageLinks.thumbnail
};

//   res.render('pages/books', { peanuts: book })
//   // res.status(200).json(book);
// });

// app.get('/food', (req, res) => {
//   let foods = ['cherries', 'choclate', 'sherry'];
//   res.render('pages/food', { ingredients: foods })
// })

// app.get('/search', (req, res) => {
//   console.log(req.query);
//   res.status(200).send('You did a GET');
// });
app.post('/searches', searchHandler);

function searchHandler (req, res) {
  try {
    
  }
  // what did the person type?
  let title = req.body.title || "hockey";
  // get a list from google

  let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`;

  superagent.get(url)
    .then(data => {
      // render the list in ejs
      res.render('pages/books', { books: data.body.items })
    })
});



// app.post('/save', (req, res) => {
//   console.log(req.query);
//   console.log(req.body);
//   res.status(200).send('You did a POST');
// });

app.listen(process.env.PORT, () => console.log(`up on ${process.env.PORT}`));
