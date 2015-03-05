'use strict';
var assert = require('assert');
var crawler = require('../');

describe('tibia-crawler', function () {
  it('parse character test', function (done) {
    process.nextTick(function () {
      crawler.character('Serphir', function(player){

        assert.equal(player.character.name, 'Serphir');
        assert.equal(player.character.level, 36);
        assert.equal(player.character.vocation, 'Knight');
        assert.equal(player.character.world, 'Luminera');

        assert.equal(player.deaths.length, 0);
        assert.equal(player.characters.length, 0);

        done();
      });
    });
  });
});
