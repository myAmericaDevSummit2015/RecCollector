module.exports = {
    data: [],
    create: function(data) {
        data.id = this.data.length + 1;
        this.data.push(data);

        return data;
    },
    find: function(id) {
        data.forEach(function(datum) {
            if(datum.id == datum) return datum;
        });

        return null;
    },
    clear: function() {
        this.data = [];
    }
};
