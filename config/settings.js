module.exports.apply = function(app, rest) {
    require('./morgan').apply(app);
    require('./connect').apply(app, rest);
};
