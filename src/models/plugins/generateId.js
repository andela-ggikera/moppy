/*
A generic plugin to autogenerate ids for model entities.
*/
module.exports = function() {
    var generateId = function(schema) {
        schema.pre('validate', function(next, done) {
            var instance = this;
            // apply to any mongoose schema
            var model = instance.model(instance.constructor.modelName);
            if (instance.id == null) {
                model.findOne().sort("-id").exec(function(err, maxInstance) {
                    if (err) { return done(err); }
                    else {
                        var maxId = maxInstance.id || 0;
                        instance.id = maxId + 1;
                        done();
                    }
                });
            } else {
                done();
            }
        });
    };
    return generateId;
};
