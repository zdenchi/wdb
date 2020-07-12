require('dotenv').config();

const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const passport       = require('passport');
const LocalStrategy  = require('passport-local');
const methodOverride = require('method-override');

/**********
 * MODELS
 *********/
const Campground = require('./models/campground');
const Comment    = require('./models/comment');
const User       = require('./models/user');
// const seedDB = require('./seeds');

//requring routes
const commentRoutes    = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes      = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp_camp_v7', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
// seedDB();

/*******************
 * PASSPORT CONFIG
 ******************/
app.use(require('express-session')({
  secret           : process.env.PASSPORT_SALT,
  resave           : false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*************
 * MIDDLEWARE
 ************/
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// 404 - For non-existing page
app.get('*', (req, res) => res.send('404 Page Not Found'));

app.listen(3000, () => console.log('App start http://127.0.0.1:3000'));
