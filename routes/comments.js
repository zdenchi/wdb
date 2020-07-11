const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function checkCommentOwnership(req, res, next) {
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
}

// COMMENTS ROUTES
// SHOW CREATE NEW COMMENT FORM
router.get('/new', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, camp) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {camp: camp});
    }
  });
});

// CREATE NEW COMMENT
router.post('/', isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          // save comment
          campground.comments.push(comment);
          campground.save();
          res.redirect(`/campgrounds/${campground.id}`);
        }
      });
    }
  });
});

// SHOW EDIT COMMENT FORM
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      console.log(err);
      res.redirect('back');
    } else {
      res.render('comments/edit', { camp_id: req.params.id, comment: foundComment});
    }
  });
});

// UPDATE COMMENT
router.put('/:comment_id', checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updComment) => {
    if (err) {
      console.log(err);
      res.redirect('/back');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// DELETE COMMENT ROUTE
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      console.log(err);
      res.redirect('back');
    } else {
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

module.exports = router;
