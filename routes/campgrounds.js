const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// INDEX - Display a list of all camps
router.get('/', (req, res) => {
  Campground.find({}, (err, campList) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {camps: campList, currentUser: req.user});
    }
  });
});

// CREATE - Add new camp to DB
router.post('/', isLoggedIn, (req, res) => {
  const name = req.body.campName;
  const image = req.body.imageURL;
  const description = req.body.description;
  const author = {
    id: req.user._id,
    username: req.user.username
  };
  const newCamp = { name: name, image: image, description: description, author: author };
  console.log(req.user);

  Campground.create(newCamp, (err, camp) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Camp successfully added!", camp);
      res.redirect('/campgrounds');
    }
  });
});

// NEW - Display form to add a new camp
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// SHOW - Shows info about one camp
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, camp) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(camp);
      res.render('campgrounds/show', {camp: camp});
    }
  });
});

module.exports = router;
