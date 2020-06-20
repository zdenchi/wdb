const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// models import
const Campground = require('./models/campground');
const seedDB = require('./seeds');

seedDB();
mongoose.connect('mongodb://localhost/yelp_camp_v3', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Campground.create(Auschwitz, Buchenwald, Dachau, (err, camp) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Camp successfully added!");
//     console.log(camp);
//   }
// })

app.get('/', (req, res) => {
  res.render('landing', {title: 'Landing Page'});
});

// INDEX - Display a list of all camps
app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, campList) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {camps: campList, title: 'All Campgrounds'});
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
      console.log(camp);
      res.redirect('/campgrounds');
    }
  });
});

// NEW - Display form to add a new camp
app.get('/campgrounds/new', (req, res) => {
  res.render('new', {title: 'Add New Campground'});
});

// SHOW - Shows info about one camp
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, camp) => {
    if (err) {
      console.log(err);
    } else {
      console.log(camp);
      res.render('show', {title: camp.name, camp: camp});
    }
  });
});

// 404 - For non-existing page
app.get('*', (req, res) => res.send('404 Page Not Found'));

app.listen(3000, () => console.log('App start http://127.0.0.1:3000'));
