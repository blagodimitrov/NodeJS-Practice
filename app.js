const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
require('dotenv').config();

const passURI = process.env.DB_PASS;
const userURI = process.env.DB_USER;
const dbURI = `mongodb+srv://${userURI}:${passURI}@blogger.90kvsax.mongodb.net/blogger?retryWrites=true&w=majority&appName=Blogger`;
mongoose
  .connect(dbURI)
  .then(() => app.listen(3000))
  .catch((err) => console.log('Error'));

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about.ejs', { title: 'About' });
});

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', {
        title: 'All Blogs',
        blogs: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create.ejs', { title: 'Create Blog' });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render('404.ejs', { title: '404 Error' });
});
