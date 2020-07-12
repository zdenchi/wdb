const express    = require('express');
const router     = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

// COMMENTS ROUTES
// SHOW CREATE NEW COMMENT FORM
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, camp) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {camp: camp});
    }
  });
});

// CREATE NEW COMMENT
router.post('/', middleware.isLoggedIn, (req, res) => {
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
          comment.author.id       = req.user._id;
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
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
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
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
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
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
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
