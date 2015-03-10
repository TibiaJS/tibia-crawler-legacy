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

    $(getWrapper()[1]).find('tr:nth-child(n+2)').each(function() {
        var key = util.camelCase($(this).find('td:nth-child(1)').text());
        var value = $(this).find('td:nth-child(2)').text().trim();

        switch (key) {
            case 'vocation':
            case 'city':
                value = value.split(', ');
                break;
            case 'group':
            case 'type':
            case 'damageType':
                value = value.toLowerCase();
                break;
            case 'cooldown':
                var match = value.match(/(\d+)/g);
                value = parseInt(match[0]);
                self.spell.groupCooldown = parseInt(match[1]);
                break;
            case 'expLvl':
                key = 'minLevel';
            /* falls through */
            case 'soulPoints':
            case 'amount':
            case 'mana':
            case 'price':
                value = parseInt(value);
                break;
            case 'premium':
                value = value === 'yes';
                break;
        }

        if (self.spell.type === 'rune') {
            self.rune = {};

            $(getWrapper()[2]).find('tr:nth-child(n+2)').each(function() {
                var key = util.camelCase($(this).find('td:nth-child(1)').text());
                var value = $(this).find('td:nth-child(2)').text().trim();

                switch (key) {
                    case 'vocation':
                        value = value.split(', ');
                        break;
                    case 'group':
                    case 'damageType':
                        value = value.toLowerCase();
                        break;
                    case 'expLvl':
                        key = 'minLevel';
                        value = parseInt(value);
                        break;
                    case 'magLvl':
                        key = 'magicLevel';
                        value = parseInt(value);
                        break;
                }

                self.rune[key] = value;
            });
        }

        self.spell[key] = value;
    });

    return this;
}

module.exports = Spell;