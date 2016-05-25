var should = require('should'),
    assert = require('assert');
var request = require('supertest');
var app = require('../src/lib/app');


describe('Movies', function() {
    describe('POST movie', function() {
        it('should create a movie', function(done) {
            var movie = {
                'id': '1',
                'title': 'The Jungle Book',
                'year': '2016'
            };

            request(app).post('/movies').send(movie).expect(201, done);
        });
    });

    // describe('GET movie', function() {
    //     it('should get a movie', function(done) {
    //         request(app).get('/movies/1').expect(200, done);
    //     });
    // });

    // describe('DELETE Movie', function() {
    //     it('should remove a movie', function(done) {
    //         request(app).delete('/movies/1').expect(204, done);
    //     });
    // });
})
