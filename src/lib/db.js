var mongoose = require('mongoose');

module.exports = function(app) {
    mongoose.connect('mongodb://localhost:27017/movies', { mongoose: { safe: true }
    }, function(err) {
        if (err) return console.log('CONNECTION ERROR: ', err)
    });
    console.log('Connected to db... on port 27017');
    return mongoose;
};
