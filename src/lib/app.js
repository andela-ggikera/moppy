var express = require('express');
var app = express();
var db = require('mongoose');
require('./parser')(app);
var actors = require('../routes/actors');
var movies = require('../routes/movies');


app.route('/actors')
.get(actors.getAll)
.post(actors.createOne);

app.route('/actors/:id')
.get(actors.getOne)
.put(actors.updateOne)
.delete(actors.deleteOne);

app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id/movies/:mid', actors.deleteMovie);

// app.route('/movies')
// .get(movies.getAll)
// .put(movies.updateOne)
// .delete(movies.deleteOne);

// app.post('/movies/:id/actors', movies.addActor);
// app.delete('/movies/:id/actors/:aid', movies.deleteActor);
// Connect to Mongo on start
db.connect('mongodb://localhost:27017/mydatabase', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})
console.log("Listening on port 3000...");
module.exports = app;
