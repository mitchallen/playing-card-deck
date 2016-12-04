/**
    Module: @mitchallen/playing-card-deck
      Test: smoke-test-factory
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    modulePath = "../index-factory";

describe('module factory smoke test', () => {

    var _factory = null;

    before( done => {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
        done();
    });

    after( done => {
        // Call after all tests
        done();
    });

    beforeEach( done => {
        // Call before each test
        done();
    });

    afterEach( done => {
        // Call after eeach test
        done();
    });

    it('module should exist', done => {
        should.exist(_factory);
        done();
    })

    it('create method with no spec should return null', done => {
        var obj = _factory.create();
        should.not.exist(obj);
        done();
    });

    it('create method with spec should return object', done => {
        var obj = _factory.create({});
        should.exist(obj);
        done();
    });

    it('health method should return ok', done => {
        var obj = _factory.create({});
        should.exist(obj);
        obj.health().should.eql("OK");
        done();
    });

    it('default deck.size should return 52', done => {
        var deck = _factory.create({});
        deck.size().should.eql(52);
        done();
    });

    it('includes should return true for valid card', done => {
        var deck = _factory.create({});
        // deck.dump();
        var card = { suit: 4, rank: 9 };
        deck.includes( card ).should.eql(true);
        deck.size().should.eql(52);
        done();
    });

    it('includes should return false for invalid card', done => {
        var deck = _factory.create({});
        // deck.dump();
        var card = { suit: 6, rank: 9 };
        deck.includes( card ).should.eql(false);
        done();
    });

    it('remove should return remove card from deck', done => {
        var deck = _factory.create({});
        // deck.dump();
        var card = { suit: 4, rank: 9 };
        deck.includes(card).should.eql(true);
        deck.remove(card);
        // deck.dump();
        deck.includes(card).should.eql(false);
        deck.size().should.eql(51);
        done();
    });

    it('shuffle should shuffle deck', done => {
        var deck = _factory.create({});
        deck.shuffle();
        deck.size().should.eql(52);
        // TODO - make sure deck is shuffled
        // deck.dump();
        done();
    });

    it('deal should remove a card from the deck and return it', done => {
        var deck = _factory.create({});
        should.exist(deck);
        deck.shuffle();
        var card = deck.deal();
        deck.size().should.eql(51);
        card.should.have.property('suit').which.is.a.Number();
        card.should.have.property('rank').which.is.a.Number();
        deck.includes(card).should.eql(false);
        done();
    });

    it('deal n should remove n cards from the deck and return them', done => {
        var deck = _factory.create({});
        should.exist(deck);
        deck.shuffle();
        var handSize = 5;
        var hand = deck.deal(handSize);
        deck.size().should.eql(52 - handSize);
        hand.length.should.eql(handSize);
        hand.forEach( function(card) {
            card.should.have.property('suit').which.is.a.Number();
            card.should.have.property('rank').which.is.a.Number();  
        });
        done();
    });
});
