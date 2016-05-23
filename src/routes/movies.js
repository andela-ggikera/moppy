var Movie = require('../models/movie');
var Actor = require('../models/actor');

module.exports = {

    // GET endpoint: /movies/:id Get a movie by id
    getOne: function (req, res, next) {
        // retrieve documents using their ObjectId
        Movie.findOne({ id: req.params.id })
        .exec(function(err, movie) {
            if (err) {
                return res.status(400).json(err);
            }
            if (!movie) {
                return res.status(404).json();
            }
            res.status(200).json(movie);
        });
    },

    // GET endpoint: /movies Get all movies
    getAll: function(req, res, next) {
        Movie.find(function(err, movies) {
            if (err) { return res.status(400).json(err);}
            res.status(200).json(movies);
        });
    },

    // POST endpoint: /movies  Add a new movie
    createOne: function(req, res, next) {
        Movie.create(req.body, function(err, movie) {
            if (err) { return res.status(400).json(err); }
            res.status(201).json(movie);
        });
    },

    // PUT endpoint: /movies/:id Update a movie
    updateOne: function(req, res, next) {
        Movie.findOneAndUpdate({
            id: req.params.id}, req.body, function(err, result) {
                if (err) { return res.status(400).json(err);
                if (!result) { return res.status(404).json(); }
                res.status(200).json(result);
            }
        });
    },

    // DELETE endpoint: /movies/:id  Delete a movie
    deleteOne: function(req, res, next) {
        Movie.findOneAndRemove({ id: req.params.id}, function(err) {
            if (err) return res.status(400).json(err);
            res.status(204).json();
        });
    },

    // POST endpoint: /movies/:id/actors add an actor
    addActor: function(req, res, next) {
        Movie.fineOne({id: req.params.id}, function(err, result) {
            if (err) { return res.status(400).json(err); }
            if (!result) { return res.status(404).json(); }

            Actor.findOne({ id: req.body.id }, function(err, actor) {
                if (err) { return res.status(400).json(err); }
                if (!actor) { return res.status(404).json() }
                result.movies.push(actor);
                result.save(function(err) {
                    if (err) {return res.status(500).json(err);}
                    res.status(201).json(result);
                });
            });
        });
    },

    // DELETE endpoint: /movies/:id/actor/:aid Delete a movie
    deleteActor: function(req, res, next) {
        Movie.findOne({ id: req.params.id }, function(err, movie) {
            if (err) { return res.status(400).json(err); }
            if(!movie) { return res.status(404).json(); }
            movie.actors = [];
            movie.save(function(err) {
                if (err) { return res.status(400).json(err); }
                res.status(204).json(movie);
            });
        });
    }
};
