# wdb
Web Developer Bootcamp

## RESTFUL ROUTES

| Name    | Path              | HTTP Verb   | Purpose                              | Mongoose Methods														|
|---------|-------------------|:-----------:|--------------------------------------|------------------------------------------------------------------------|
| Index   | /blogs            | GET         | List all camps                       | Blog.find({}, callback)												|
| New     | /blogs/new        | GET         | Form to add a new camp               | null																	|
| Create  | /blogs            | POST        | Add new camp to DB                   | Blog.create(req.body.blog, callback)									|
| Show    | /blogs/:id        | GET         | Shows info about one specific camp   | Blog.findById(req.params.id, callback)									|
| Edit    | /blogs/:id/edit   | GET         | Edit form                            | Blog.findById(req.params.id, callback)									|
| Update  | /blogs/:id        | PUT         | Update camp                          | Blog.findByIdAndUpdate(req.params.id, req.body.blog, callback)			|
| Destroy | /blogs/:id        | DELETE      | Delete camp                          | Blog.findByIdAndRemove(req.params.id, callback)						|