'use strict';
var util = require('../util');

/**
  * Character fetcher
  *
  * @param  {cheerio} $
  * @return this
  */

function Character($) {

  this.data = {
    character: {},
    achievements: [],
    deaths: [],
    account: {},
    characters: []
  }

  var self = this;

  var getWrapper = function(key) {
    return $('b:contains("' + key + '")').closest('table');
  };

  getWrapper('Character Information')
  .find('tr:nth-child(n+2)')
  .each(function() {
    var key = util.camelCase($(this).find('td:nth-child(1)').text());
    var value = $(this).find('td:nth-child(2)').text().trim();
    switch(key) {

      case 'achievementPoints':
      case 'level':
        value = parseInt(value);
      break;

    }

    self.data.character[key] = value;
  });

  getWrapper('Account Achievements')
  .find('tr:nth-child(n+2)')
  .each(function() {
    var value = {
      grade: $(this).find('td:nth-child(1) img').length,
      name: $(this).find('td:nth-child(2)').text().trim(),
      secret: $(this).find('td:nth-child(2) img').length === 1
    };

    if(value.name !== '') {
      self.data.achievements.push(value);
    }
  });

  getWrapper('Character Deaths')
  .find('tr:nth-child(n+2)')
  .each(function() {
    self.data.deaths.push({
      date: $(this).find('td:nth-child(1)').text()
            .replace(String.fromCharCode(160), ' ').replace('CET', '').trim(),
      level: parseInt($(this).find('td:nth-child(2)').text().match(/[0-9]+/g)[0]),
      by: $(this).find('td:nth-child(2)').text().match(/\D+/g)[1]
          .replace('by an').replace('by a', '').replace('by', '')
          .replace('.', '').replace(' and ',', ').trim().split(', ')
    });
  });

  getWrapper('Account Information')
  .find('tr:nth-child(n+2)')
  .each(function() {
    var index = util.camelCase($(this).find('td:nth-child(1)').text());
    var value = $(this).find('td:nth-child(2)').text().trim();

    self.data.account[index] = value;
  });

  getWrapper('Characters')
  .find('tr:nth-child(n+3)')
  .each(function() {
    self.data.characters.push({
      name: $(this).find('td:nth-child(1)').find('input[type=hidden]').val(),
      world: $(this).find('td:nth-child(2)').text(),
      online: $(this).find('td:nth-child(3)').text() === 'online'
    });
  });

  return this.data;
}

module.exports = Character;
