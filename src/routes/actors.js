/*
 * Define endpoints for the moppy Api.
*/

var Actor = require('../models/actor');
var Movie = require('../models/movie');

module.exports = {

    // GET endpoint: /actors/:id Get an actor by id
    getOne: function (req, res, next) {
        // retrieve documents using their ObjectId
        Actor.findOne({ id: req.params.id})
        .populate('movies')
        .exec(function(err, actor) {
            if (err) {
                return res.status(400).json(err);
            }
            if (!actor) {
                return res.status(404).json();
            }
            res.status(200).json(actor);
        });
    },

    // GET endpoint: /actors Get all actors
    getAll: function(req, res, next) {
        Actor.find(function(err, actors) {
            if (err) { return res.status(400).json(err);}
            res.status(200).json(actors);
        });
    },

    // POST endpoint: /actors/:id  Add a new actor
    createOne: function(req, res, next) {
        Actor.create(req.body, function(err, actor) {
            if (err) { return res.status(400).json(err); }
            res.status(201).json(actor);
        });
    },

    // PUT endpoint: /actors/:id Update an actor
    updateOne: function(req, res, next) {
        Actor.findOneAndUpdate({
            id: req.params.id}, req.body, function(err, result) {
                if (err) { return res.status(400).json(err);
                if (!result) { return res.status(404).json(); }
                res.status(200).json(result);
            }
        });
    },

    // DELETE endpoint: /actors/:id  Delete an actor
    deleteOne: function(req, res, next) {
        Actor.findOneAndRemove({ id: req.params.id}, function(err, results) {
            if (err) return res.status(400).json(err);
            res.status(204).json(results);
        });
    },

    // POST endpoint: /actors/:id/movies add one movie
    addMovie: function(req, res, next) {
        Actor.findOne({id: req.params.id}, function(err, result) {
            if (err) return res.status(400).json(err);
            if (!result) {
                return res.status(404).json();
            }
            Movie.findOne({ id: req.body.id }, function(err, movie) {
                if (err) return res.status(400).json(err);
                // if it does not exist already
                if (!movie) {
                    // add the new movie to the actors list
                    Movie.create(req.body, function(err, movie) {
                        if (err) {
                            return res.status(400).json(err);
                        }
                        result.movies.push(movie);
                    });
                }
                else {
                    // check to see if the movie is already added
                    for (var i = 0; i < result.movies.length; i++) {
                        if (result.movies[i] == movie._id) {
                            // already exists in array
                            return res.status(302).json(result);
                        } else {
                            // existed but not in our array...so add it
                            result.movies.push(movie);
                        }
                    }
                }
                result.save(function(err) {
                    if (err) {return res.status(500).json(err);}
                    res.status(201).json(result);
                });
            });
        });
    },

    // DELETE endpoint: /actors/:id/movies/:mid Delete a movie
    deleteMovie: function(req, res, next) {
        Actor.findOne({ id: req.params.id }, function(err, actor) {
            if (err) { return res.status(400).json(err); }
            if(!actor) { return res.status(404).json(); }
            Movie.findOne({ id: req.params.mid }, function(err, movie) {
                actor.movies.deleteItem(actor._id);
            });
            actor.save(function(err) {
                if (err) { return res.status(400).json(err); }
                res.status(200).json(actor);
            });
        });
    }
};
