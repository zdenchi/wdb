const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const request = require('request');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


const campgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required!"]
  },
  image: String,
  description: String
});

const Campground = mongoose.model('Campground', campgroundSchema);

const Auschwitz = new Campground({
  name: "Auschwitz",
  image: "https://upload.wikimedia.org/wikipedia/commons/7/74/Auschwitz-Work_Set_Free-new.JPG",
  description: "The Auschwitz concentration camp was a complex of over 40 concentration and extermination camps operated by Nazi Germany in occupied Poland during World War II and the Holocaust. It consisted of Auschwitz I, the main camp (Stammlager) in Oświęcim; Auschwitz II-Birkenau, a concentration and extermination camp built with several gas chambers; Auschwitz III-Monowitz, a labor camp created to staff a factory for the chemical conglomerate IG Farben; and dozens of subcamps. The camps became a major site of the Nazis' Final Solution to the Jewish Question."
});

const Buchenwald = new Campground({
  name: "Buchenwald",
  image: "https://veliky-novgorod.sm.news/wp-content/uploads/2020/05/08/9m-3-1300x675.jpg",
  description: "Buchenwald was a Nazi concentration camp established on Ettersberg [de] hill near Weimar, Germany, in July 1937. It was one of the first and the largest of the concentration camps within Germany's 1937 borders. Many actual or suspected communists were among the first internees."
});

const Dachau = new Campground({
  name: "Dachau",
  image: "https://holidaygid.ru/wp-content/uploads/2012/05/Dachau4.jpg",
  description: "Dachau was the first of the Nazi concentration camps opened in 1933, which was initially intended to hold political prisoners. It is located on the grounds of an abandoned munitions factory northeast of the medieval town of Dachau, about 16 km (10 mi) northwest of Munich in the state of Bavaria, in southern Germany. After its opening by Heinrich Himmler, its purpose was enlarged to include forced labor, and, eventually, the imprisonment of Jews, German and Austrian criminals, and finally foreign nationals from countries that Germany occupied or invaded. The Dachau camp system grew to include nearly 100 sub-camps, which were mostly work camps or Arbeitskommandos, and were located throughout southern Germany and Austria. The main camp was liberated by U.S. forces on 29 April 1945."
});

// Campground.create(Auschwitz, Buchenwald, Dachau, (err, camp) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Camp successfully added!");
//     console.log(camp);
//   }
// })

// const campTemporaryDB = [
//   {name: "Bishop group site", image: "https://live.staticflickr.com/4101/4752592043_6928ab3abe_k.jpg"},
//   {name: "Orgo Campground", image: "https://live.staticflickr.com/4082/4753232364_406669131e_k.jpg"},
//   {name: "Rolo Campground", image: "https://live.staticflickr.com/3246/2699036037_c4b5680b60_k.jpg"},
//   {name: "Bis Campground", image: "https://live.staticflickr.com/1276/968007658_ff6574c532_k.jpg"},
//   {name: "Laguna Campground", image: "https://live.staticflickr.com/8467/28750581650_02f8489f16_k.jpg"},
//   {name: "Leo Carillo Campground", image: "https://live.staticflickr.com/3011/2997488895_37af05bdc0_k.jpg"},
//   {name: "Kirk Creek Campground", image: "https://live.staticflickr.com/3191/3061337059_fe5950022c_k.jpg"},
//   {name: "Siana Campground", image: "https://live.staticflickr.com/5597/15269411879_86a8bc43cc_k.jpg"},
//   {name: "Luar Campground", image: "https://live.staticflickr.com/4423/37232133702_b8fbe71f97_k.jpg"},
//   {name: "Camping at Occoneechee State Park", image: "https://live.staticflickr.com/3898/14445654425_3c9103d8d5_k.jpg"},
//   {name: "Binf Campground", image: "https://live.staticflickr.com/7457/9586944536_aede975b9b_h.jpg"}
// ];

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
  Campground.findById(req.params.id, (err, camp) => {
    if (err) {
      console.log(err);
    } else {
      res.render('show', {title: camp.name, camp: camp});
    }
  });
});

// 404 - For non-existing page
app.get('*', (req, res) => res.send('404 Page Not Found'));

app.listen(3000, () => console.log('App start http://127.0.0.1:3000'));
