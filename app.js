const express = require('express');
const app = express();
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDB = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp_v4', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
seedDB();

app.get('/', (req, res) => {
  res.render('landing');
});

// INDEX - Display a list of all camps
app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, campList) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {camps: campList});
    }
  });
});

// CREATE - Add new camp to DB
app.post('/campgrounds', (req, res) => {
  const name = req.body.campName;
  const image = req.body.imageURL;
  const description = req.body.description;
  const newCamp = {name: name, image: image, description: description};

  Campground.create(newCamp, (err, camp) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Camp successfully added!");
      res.redirect('/campgrounds');
    }
  });
});

// NEW - Display form to add a new camp
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

// SHOW - Shows info about one camp
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, camp) => {
    if (err) {
      console.log(err);
    } else {
      console.log(camp);
      res.render('campgrounds/show', {camp: camp});
    }
  });
});

// COMMENTS ROUTES
app.get('/campgrounds/:id/comments/new', (req, res) => {
  Campground.findById(req.params.id, (err, camp) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {camp: camp});
    }
  });
});

app.post('/campgrounds/:id/comments', (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground.id}`);
        }
      });
    }
  });
});

// 404 - For non-existing page
app.get('*', (req, res) => res.send('404 Page Not Found'));

app.listen(3000, () => console.log('App start http://127.0.0.1:3000'));
