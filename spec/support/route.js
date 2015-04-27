var processedRest = function(route, app, rest) {
    route.apply(app, rest);

    return rest;
};

module.exports = {
    isGetRequest: function(route, app, rest) {
        rest = processedRest(route, app, rest);

        return rest.method === 'GET';
    },
    isCorrectPath: function(route, app, rest, path) {
        rest = processedRest(route, app, rest);

        return rest.path === path;
    }
};
