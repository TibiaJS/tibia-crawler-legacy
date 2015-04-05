'use strict';

var util = require('../util');

/**
  * Character fetcher
  *
  * @param  {cheerio} $
  * @return this
  */

function World($) {

  this.data = {
    world: {},
    online: []
  }

  var self = this;

  var getWrapper = function(key) {
    return $('div.Text:contains("' + key + '")').closest('.TableContainer').find('.InnerTableContainer table');
  };

  getWrapper('World Information')
  .find('tr')
  .each(function() {
    var key = util.camelCase($(this).find('td:nth-child(1)').text());
    var value = $(this).find('td:nth-child(2)').text().trim();

    if(key === 'status') {
       self.data.world['online'] = value === 'Online';
       return;
    }

    if(key === 'playersOnline') {
      value = parseInt(value);
    }

    if(key === 'worldQuestTitles') {
      value = value.split(', ');
    }

    self.data.world[key] = value;
  });

  getWrapper('Players Online')
  .find('tr:nth-child(n+2)')
  .each(function() {
    var value = {
      name: $(this).find('td:nth-child(1)').text().trim(),
      level: parseInt($(this).find('td:nth-child(2)').text()),
      vocation: $(this).find('td:nth-child(3)').text().trim()
    };
    self.data.online.push(value);
  });

  return this.data;
}

module.exports = World;
