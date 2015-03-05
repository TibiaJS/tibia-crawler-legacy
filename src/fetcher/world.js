/**
  * Character fetcher
  *
  * @param  {cheerio} $
  * @return this
  */

function World($){

  this.world = {};
  this.online = ['a'];

  var self = this;

  var getWrapper = function(key){
    return $('div.Text:contains("' + key + '")').closest('.TableContainer').find('.InnerTableContainer table');
  };

  getWrapper('World Information')
  .find('tr')
  .each(function(){
    var key = $(this).find('td:nth-child(1)').text()
      .replace(':', '')
      .replace(/\s/g, '_')
      .toLowerCase();
    var value = $(this).find('td:nth-child(2)').text().trim();

    if(key == 'players_online'){
      value = parseInt(value);
    }

    if(key == 'world_quest_titles'){
      value = value.split(', ');
    }

    self.world[key] = value;
  });
  this.world['online'] = this.world['status'] == 'Online';


  getWrapper('Players Online')
  .find('tr:nth-child(n+2)')
  .each(function(){
    var value = {
      name: $(this).find('td:nth-child(1)').text().trim(),
      level: parseInt($(this).find('td:nth-child(2)').text()),
      vocation: $(this).find('td:nth-child(3)').text().trim()
    };
    self.online.push(value);
  });

  return this;
}

module.exports = World;
