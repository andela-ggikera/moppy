// Actor endpoints
var app = require('./app');
app.route('/actors')
.get(actors.getAll)
.post(actors.createOne);

app.route('/actors/:id')
.get(actors.getOne)
.put(actors.updateOne)
.delete(actors.deleteOne);

app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id/movies/:mid', actors.deleteMovie);

app.route('/movies')
.get(movies.getAll)
.put(movies.updateOne)
.delete(movies.deleteOne);

app.post('/movies/:id/actors', movies.addActor);
app.delete('/movies/:id/actors/:aid', movies.deleteActor);
