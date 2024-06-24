const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const blogRoutes = require('./routes/blogRoutes');

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

app.use('/blogs', blogRoutes);

app.use((req, res) => {
  res.status(404).render('404.ejs', { title: '404 Error' });
});
