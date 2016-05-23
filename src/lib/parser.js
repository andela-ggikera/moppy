/*
 * Body parser for the POST and GET requests
 */
var bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyparser.json());
    app.use(bodyParser.urlencoded({extendedL false}));
};
