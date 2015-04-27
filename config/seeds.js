module.exports.apply = function() {
    console.log('Seeding...');

    [
        require('./seeds/apis'),
        require('./seeds/users')
    ].forEach(function(seed) { seed.call(); });

    console.log('...completed');
};
