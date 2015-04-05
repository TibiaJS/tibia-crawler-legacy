'use strict';
var assert = require('assert');
var crawler = require('../');

describe('tibia-crawler', function() {

    this.timeout(6000); // 4sec for timeout, but world page is too long)

    it('parse exists character test', function(done) {
        process.nextTick(function() {
            crawler.character('Serphir', function(player) {
                assert.equal(player.character.name, 'Serphir');

                done();
            });
        });
    });

    it('parse non-exists character test', function(done) {
        process.nextTick(function() {
            crawler.character('Sexrphir', function(player) {

                assert.equal(player, undefined);

                done();
            });
        });
    });

    it('parse exists world test', function(done) {
        process.nextTick(function() {
            crawler.world('Luminera', function(world) {
                world = world.world;

                assert.equal(world.online, true);
                assert.equal(world.pvpType, 'Optional PvP');
                assert.equal(world.creationDate, '07/05');

                done();
            });
        });
    });


    it('parse non-exists world test', function(done) {
        process.nextTick(function() {
            crawler.world('Luminerx', function(world) {

                assert.equal(world, undefined);

                done();
            });
        });
    });


    it('parse spell list test', function(done) {
        process.nextTick(function() {
            crawler.spells(function(spells) {

                assert.equal(spells.length, 133);

                done();
            });
        });
    });


    it('parse highscores test', function(done) {
        process.nextTick(function() {
            crawler.highscores('Pacera', 'experience', 0, function(highscore) {

                assert.equal(highscore.rank.length, 25);

                done();
            });
        });
    });


    it('parse wrong category at highscores test', function(done) {
        var fn = function() {
          try {
            crawler.highscores('Pacera', 'zoeira', 0, function() {});
          } catch(e) {
            throw e;
          }
        };

        process.nextTick(function() {
            assert.throws(function() { fn(); }, /Unknown zoeira category/);
            done();
        });
    });

});
