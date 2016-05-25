/*
 * Body parser for the POST and GET requests
 */
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
};
