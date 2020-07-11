const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const { findById } = require('../models/comment');

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

// EDIT CAMP ROUTE
router.get('/:id/edit', checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCamp) => {
    res.render('campgrounds/edit', { camp: foundCamp });
  });
});

// UPD CAMP ROUTE
router.put('/:id', checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updCamp) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// DESTROY CAMP ROUTE
router.delete('/:id', checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds/');
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkCampgroundOwnership(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCamp) => {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else if (foundCamp.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect('back');
      }
    });
  } else {
    res.redirect('back');
  }
}

module.exports = router;
