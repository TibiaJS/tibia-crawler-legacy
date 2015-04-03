var api = require('./request');
var cheerio = require('cheerio');

// Fetchers
var Character = require('./fetchers/character');
var Spells = require('./fetchers/spells');
var Highscores = require('./fetchers/highscores');
var World = require('./fetchers/world');
var Worlds = require('./fetchers/worlds');

var TibiaCrawler = {

    character: function(name, cb) {
        name = name.replace(' ', '+').replace('%20', '+');
        var path = 'community/?subtopic=characters&name=' + name;
        return api.request('get', path, {}, function(err, res, body) {
            var $ = cheerio.load(body);
            if ($('b:contains("Could not find character")').closest('table').length === 1) {
                cb();
            } else {
                var player = new Character($);
                cb(player);
            }
        });
    },

    spells: function(cb) {
        var path = 'library/?subtopic=spells';
        return api.request('get', path, {}, function(err, res, body) {
            cb(new Spells(cheerio.load(body)));
        });
    },

    highscores: function(world, category, page, cb) {
        var categories = ['experience', 'magic', 'shielding', 'distance', 'sword', 'club', 'axe', 'fist', 'fishing', 'achievements', 'loyalty'];

        category = category || 'experience';
        if(categories.indexOf(category) === -1) {
          throw new Error('Unknown ' + category + ' category. Avaliables: ' + categories.join(', ') + '.');
        }

        this.world(world, function(exists) {

          if(exists) {
            page = page || 0;

            var path = 'community/?subtopic=highscores&world=' + world + '&list=' + category + '&page=' + parseInt(page);
            return api.request('get', path, {}, function(err, res, body) {
                var $ = cheerio.load(body);
                cb(new Highscores($, category));
            });
          } else {
            throw new Error('Unknown world name ' + world + '.');
          }

        });
    },

    world: function(name, cb) {
        var path = 'community/?subtopic=worlds&world=' + name;
        return api.request('get', path, {}, function(err, res, body) {
            var $ = cheerio.load(body);
            if ($('.red:contains("World with this name doesn\'t exist!")').length === 1) {
                cb();
            } else {
                cb(new World($));
            }
        });
    },

    worlds: function(cb) {
        var path = 'community/?subtopic=worlds';
        return api.request('get', path, {}, function(err, res, body) {
            cb(new Worlds(cheerio.load(body)));
        });
    }

};

module.exports = TibiaCrawler;
