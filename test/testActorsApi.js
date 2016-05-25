var should = require('should'),
    assert = require('assert');
var request = require('supertest');
var app = require('../src/lib/app');


describe('Actors', function() {
    describe('POST actor', function() {
        it('should create an actor', function(done) {
            var actor = {
                'id':'1',
                'name': 'Jee Banks', 'birth_year': '2014',
            };

            request(app).post('/actors').send(actor).expect(201, done);
        });
    });

    describe('GET actor', function() {
        it('should get an actor', function(done) {
            request(app).get('/actors/1').expect(200, done);
        });
    });

    describe('DELETE Actor', function() {
        it('should remove an actor', function(done) {
            request(app).delete('/actors/1').expect(204, done);
        });
    });

    describe('POST /actors/:id/movies', function() {
        it('should add a movie to the actor', function(done) {
            var movie = {
                'id': '1',
                'title': 'Viva',
                'year': '2017'
            }
            request(app).post('/actors/2/movies').send(movie)
            .expect(201, done);
        });

        // it('actor should have array of movies', function(done) {
        //     request(app).get('/actors/1').expect(200).end(
        //         function(err, res) {
        //             res.body.movies.should.eql(['1']);
        //             done();
        //         });
        // });
    });
})
