'use strict';

function Spells($) {

    this.data = [];
    var self = this;

    var getWrapper = function() {
        return $('.BoxContent table').first();
    };

    getWrapper().find('tr:nth-child(n+2)').each(function(index, item) {
        item = $(item).find('td');


        var match = $(item[0]).text().match(/(.*) \((.*)\)/),
            name = match[1],
            words = match[2];


        self.data.push({
            name: name,
            words: words,
            group: $(item[1]).text(),
            type: $(item[2]).text(),
            minLevel: parseInt($(item[3]).text()),
            mana: parseInt($(item[4]).text()) || 0,
            price: parseInt($(item[5]).text()) || 0,
            premium: $(item[6]).text() === 'yes'
        });
    });

    return this.data;
}

module.exports = Spells;
