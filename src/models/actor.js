// object modeling for actor db
var mongoose = require('mongoose');
var generatedId = require('./plugins/generateId');

var actorSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        index: {
            unique: true
        }
    },
    name: {
        type: String,
        required: true
    },
    movies: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]
});
actorSchema.plugin(generatedId());
module.exports = mongoose.model('Actor', actorSchema);
