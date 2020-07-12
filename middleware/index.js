const Campground = require('../models/campground');
const Comment    = require('../models/comment');

const middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect('/login');
  } else if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else if (foundComment.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect('back');
      }
    });
  } else {
    res.redirect('back');
  }
};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
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
};

module.exports = middlewareObj;
