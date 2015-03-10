'use strict';

var util = require('../util');

/**
 * Spell fetcher
 *
 * @param  {cheerio} $
 * @return this
 */

function Spell($) {

    this.spell = {};

    var self = this;

    var getWrapper = function() {
        return $('.BoxContent table');
    };

    $(getWrapper()[1]).find('tr:nth-child(n+2)').each(function(index, item) {

    });

    return this;
}

module.exports = Spell;