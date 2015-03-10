'use strict';

function Spell($) {

    var self = this;

    var getWrapper = function() {
        return $('.BoxContent table');
    };

    $(getWrapper()[1]).find('tr:nth-child(n+2)').each(function(index, item) {

    });

    return this;
}

module.exports = Spell;