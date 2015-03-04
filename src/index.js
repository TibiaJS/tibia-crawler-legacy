var request = require('./request');
var cheerio = require('cheerio');

/* Fetchers */
var Character = require('./fetcher/character');
var World = require('./fetcher/world');

var TibiaCrawler = {

  character: function(name, callback){
    var name = name.replace(' ', '+').replace('%20', '+');
    var path = 'community/?subtopic=characters&name=' + name;
    return request('get', path, {}, function(err, res, body){
      callback(
        new Character(cheerio.load(body))
      );
    });
  },

  world: function(name, callback){
    var path = 'community/?subtopic=worlds&world=' + name;
    return request('get', path, {}, function(err, res, body){
      callback(
        new World(cheerio.load(body))
      );
    });
  }

}

module.exports = TibiaCrawler;
