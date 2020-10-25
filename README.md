# wdb
Web Developer Bootcamp

## RESTFUL ROUTES

| Name | Path | HTTP Verb | Purpose | Mongoose Methods |
|------|-----|------|------|------|
| Index   | /blogs           | GET       | List all camps         | Blog.find({}, callback)             	|
| New     | /blogs/new       | GET       | Form to add a new camp | null                                  |
| Create  | /blogs           | POST      | Add new camp to DB     | Blog.create(req.body.blog, callback)  |
| Show    | /blogs/: id      | GET       | Shows info about one specific camp | Blog.findById(req.params.id, callback) |
| Edit    | /blogs/: id/edit | GET       | Edit form              | Blog.findById(req.params.id, callback)|
| Update  | /blogs/: id      | PUT       | Update camp            | Blog.findByIdAndUpdate(req.params.id, req.body.blog, callback) |
| Destroy | /blogs/: id      | DELETE    | Delete camp            | Blog.findByIdAndRemove(req.params.id, callback) |

<br><hr><br>

| name | url | verb | desc |
|------|-----|------|------|
| INDEX  | /campgrounds     | GET  | Display a list of all campgrounds |
| NEW    | /campgrounds/new | GET  | Displays form to make a new campgrounds |
| CREATE | /campgrounds     | POST | Add new campgrounds to DB |
| SHOW   | /campgrounds/: id | GET  | Shows info about one campgrounds |
| NEW    | /campgrounds/: id/comments/new | GET | Displays form to make a new comment |
| CREATE | /campgrounds/: id/comments | POST | Add new comment to DB |
