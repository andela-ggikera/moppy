var should = require('should'),
    assert = require('assert');
var request = require('supertest');
var app = require('../src/lib/app');
var mongo = require('mongoose');

describe('Movies', function() {
    before(function (done) {
        mongo.connect('mongodb://localhost:27017/moppy', function(){
            mongo.connection.db.dropDatabase(function(){
                console.log("Dropping the database ...");
                done();
            });
        });
    })
    describe('POST movie', function() {
        it('should create a movie', function(done) {
            var randomId = Math.floor(Math.random() * 100);
            var movie = {
                'id': '2',
                'title': 'The Jungle Book',
                'year': '2016'
            };

            request(app).post('/movies').send(movie).expect(201, done);
        });

        it('should not allow creation of duplicate movies', function(done) {
            var movie = {
                'id': '2',
                'title': 'The Jungle Book',
                'year': '2016'
            }

            request(app).post('/movies').send(movie).expect(400, done);
        })
    });

    describe('GET movie', function() {
        it('should get a movie', function(done) {
            // get one movie from the database
            request(app).get('/movies/2').expect(200, done);
        });
    });

    describe('POST ACTORS /movies/:id/actors', function(done) {
        it('should add actors to a movie', function(done) {
            var actor = {
                'id': '3',
                'name': 'Joana Banks',
                'birth_year': '2010',
            }
            request(app).post('/movies/2/actors').send(actor)
            .expect(201, done);
        });

        it('actor should have array of movies', function(done) {
            request(app).get('/movies/2').expect(200).end(
                function(err, res) {
                    res.body.actors.should.not.be.empty;
                    done();
                });
        });
    });

    describe('DELETE /movies/:id/actors/:actor_id', function() {
        it('should remove an actor from a movie', function(done) {
            request(app).delete('/movies/2/actors/1').expect(200, done);
        });

        it('movie should not have that actor anymore', function(done) {
            request(app).get('/movies/2').expect(201).end(function(err, res) {
                res.body.actors.should.eql([]);
            });
            done();
        });
    });

    describe('DELETE Movie', function() {
        it('should remove a movie', function(done) {
            request(app).delete('/movies/1').expect(204, done);
        });
    });
})
