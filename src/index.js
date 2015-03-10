var api = require('./request');
var cheerio = require('cheerio');

// Fetchers
var Character = require('./fetcher/character');
var Spell = require('./fetcher/spell');
var Spells = require('./fetcher/spells');
var World = require('./fetcher/world');
var Worlds = require('./fetcher/worlds');

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

    spell: function(name, cb) {
        var path = 'library/?subtopic=spells&spell=' + name.toLowerCase().replace(/\W/g, '');
        return api.request('get', path, {}, function(err, res, body) {
            var $ = cheerio.load(body);
            if ($('h2:contains("' + name + '")').length === 0) {
                cb();
            } else {
                cb(new Spell($));
            }
        });
    },

    spells: function(cb) {
        var path = 'library/?subtopic=spells';
        return api.request('get', path, {}, function(err, res, body) {
            cb(new Spells(cheerio.load(body)));
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
