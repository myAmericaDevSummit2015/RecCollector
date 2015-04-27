module.exports = {
    parseCoordinates: function(coordinates) {
        var splitArgument = coordinates.indexOf(', ') > -1 ? ', ' : ',';
        var splitCoordinates = coordinates.split(splitArgument);

        return {latitude: splitCoordinates[0], longitude: splitCoordinates[1]};
    }
};
