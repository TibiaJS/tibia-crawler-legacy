'use strict';
var assert = require('assert');
var crawler = require('../');

describe('tibia-crawler', function() {

    this.timeout(6000); // 4sec for timeout, but world page is too long)
    it('parse exists character test', function(done) {
        process.nextTick(function() {
            crawler.character('Serphir', function(player) {
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
        this.timeout(4000); // 4sec for timeout, but world page is too long)
        process.nextTick(function() {
            crawler.world('Luminerx', function(world) {

                assert.equal(world, undefined);

                done();
            });
        });
    });


    it('parse world list test', function(done) {
        this.timeout(4000); // 4sec for timeout, but world page is too long)
        process.nextTick(function() {
            crawler.worlds(function(worlds) {

                assert.equal(worlds.worlds.length, 61);

                done();
            });
        });
    });


    it('parse spell list test', function(done) {
        this.timeout(4000);
        process.nextTick(function() {
            crawler.spells(function(spells) {

                assert.equal(spells.spells.length, 133);

                done();
            });
        });
    });


    it('parse existing spell test', function(done) {
        this.timeout(4000);
        process.nextTick(function() {
            crawler.spell('Rage of the Skies', function(spell) {
                spell = spell.spell;

                assert.equal(spell.name, 'Rage of the Skies');
                assert.equal(spell.formula, 'exevo gran mas vis');
                assert.deepEqual(spell.vocation, ['Sorcerer']);
                assert.equal(spell.group, 'attack');
                assert.equal(spell.type, 'instant');
                assert.equal(spell.damageType, 'energy');
                assert.equal(spell.cooldown, 40);
                assert.equal(spell.groupCooldown, 4);
                assert.equal(spell.minLevel, 55);
                assert.equal(spell.mana, 600);
                assert.equal(spell.price, 6000);
                assert.deepEqual(spell.city, ['Edron']);
                assert.equal(spell.premium, true);

                done();
            });
        });
    });


    it('parse non-existing spell test', function(done) {
        this.timeout(4000);
        process.nextTick(function() {
            crawler.spell('Rage of the Skiesx', function(spell) {

                assert.equal(spell, undefined);

                done();
            });
        });
    });

});
