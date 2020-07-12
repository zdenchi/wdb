const Campground = require('../models/campground');
const Comment    = require('../models/comment');

const middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'Please Login First!');
  res.redirect('/login');
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('error', "You need to be login!");
    res.redirect('/login');
  } else if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        req.flash('error', 'Comment not found');
        res.redirect('back');
      } else if (foundComment.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', "You don't have permission to do that!");
        res.redirect('back');
      }
    });
  } else {
    req.flash('error', "You don't have permission to do that!");
    res.redirect('back');
  }
};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('error', "You need to be login!");
    res.redirect('/login');
  } else if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCamp) => {
      if (err) {
        req.flash('error', 'Camp not found');
        res.redirect('back');
      } else if (foundCamp.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', "You don't have permission to do that!");
        res.redirect('back');
      }
    });
  } else {
    req.flash('error', "You don't have permission to do that!");
    res.redirect('back');
  }
};

module.exports = middlewareObj;
