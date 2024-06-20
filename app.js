const express = require('express');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'Mario finds stars',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
  ];
  res.render('index.ejs', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about.ejs', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create.ejs', { title: 'Create Blog' });
});

app.use((req, res) => {
  res.status(404).render('404.ejs', { title: '404 Error' });
});
