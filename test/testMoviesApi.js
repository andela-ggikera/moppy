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
    });

    describe('GET movie', function() {
        it('should get a movie', function(done) {
            // get one movie from the database
            request(app).get('/movies/2').expect(200, done);
        });
    });

    describe('DELETE Movie', function() {
        it('should remove a movie', function(done) {
            request(app).delete('/movies/1').expect(204, done);
        });
    });
})
