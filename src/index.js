var api = require('./request');
var cheerio = require('cheerio');

// Fetchers
var Character = require('./fetchers/character');
var Spells = require('./fetchers/spells');
var Highscores = require('./fetchers/highscores');
var World = require('./fetchers/world');
var Worlds = require('./fetchers/worlds');
var KillStatistics = require('./fetchers/killstatistics');

var TibiaCrawler = {

    character: function(name, cb) {
      name = name.replace(' ', '+').replace('%20', '+');
      var path = 'community/?subtopic=characters&name=' + name;
      return api.request('get', path, {}, function(err, res, body) {
        if(!err){
          var $ = cheerio.load(body);
          if ($('b:contains("Could not find character")').closest('table').length === 1) {
            cb(null);
          } else {
            var player = new Character($);
            cb(player);
          }
        }
      });
    },

    spells: function(cb) {
      var path = 'library/?subtopic=spells';
      return api.request('get', path, {}, function(err, res, body) {
        if(!err){
          cb(new Spells(cheerio.load(body)));
        } else {
          throw new Error('Request error');
        }
      });
    },

    highscores: function(world, category, page, cb) {
      var categories = ['experience', 'magic', 'shielding', 'distance', 'sword', 'club', 'axe', 'fist', 'fishing', 'achievements', 'loyalty'];

      category = category || 'experience';
      if(categories.indexOf(category) === -1) {
        throw new Error('Unknown ' + category + ' category. Avaliables: ' + categories.join(', ') + '.');
      }

      //TODO: Cache this
      this.world(world, function(exists) {

        if(exists) {
          page = page || 0;

          var path = 'community/?subtopic=highscores&world=' + world + '&list=' + category + '&page=' + parseInt(page);
          return api.request('get', path, {}, function(err, res, body) {
            if(!err){
              var $ = cheerio.load(body);
              cb(new Highscores($, category));
            } else {
              throw new Error('Request error');
            }
          });
        } else {
          throw new Error('Unknown world name ' + world + '.');
        }

      });
    },

    world: function(name, cb) {
      var path = 'community/?subtopic=worlds&world=' + name;
      return api.request('get', path, {}, function(err, res, body) {
        if(!err){
          var $ = cheerio.load(body);
          if ($('.red:contains("World with this name doesn\'t exist!")').length === 1) {
              cb();
          } else {
              cb(new World($));
          }
        } else {
          throw new Error('Request error');
        }
      });
    },

    worlds: function(cb) {
      var path = 'community/?subtopic=worlds';
      return api.request('get', path, {}, function(err, res, body) {
        if(!err){
          cb(new Worlds(cheerio.load(body)));
        } else {
          throw new Error('Request error');
        }
      });
    },

    killStatistics: function(world, cb){
      var path = 'community/?subtopic=killstatistics&world=' + world;
      return api.request('get', path, {}, function(err, res, body) {
        if(!err){
          cb(new KillStatistics(cheerio.load(body)));
        } else {
          throw new Error('Request error');
        }
      });
    }

};

module.exports = TibiaCrawler;
