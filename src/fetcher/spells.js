'use strict';

function Spells($) {

    this.spells = [];
    var self = this;

    var getWrapper = function() {
        return $('.BoxContent table').first();
    };

    getWrapper().find('tr:nth-child(n+2)').each(function(index, item) {
        item = $(item).find('td');

        self.spells.push({
            name: $(item[0]).text(),
            group: $(item[1]).text(),
            type: $(item[2]).text(),
            minLevel: parseInt($(item[3]).text()),
            mana: parseInt($(item[4]).text()),
            price: $(item[5]).text() === 'free' ? 0 : parseInt($(item[5]).text()),
            premium: $(item[6]).text() === 'yes'
        });
    });

    this.spells.shift();
}

module.exports = Spells;