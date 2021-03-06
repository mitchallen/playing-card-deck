/**
    Module: @mitchallen/playing-card-deck
    Author: Mitch Allen
*/

/*jshint esversion: 6 */

"use strict";

var cardFactory = require("@mitchallen/playing-card"),
    SUIT = require("@mitchallen/playing-card-suit"),
    RANK = require("@mitchallen/playing-card-rank"),
    shuffleFactory = require("@mitchallen/shuffle");

module.exports.create = (spec) => {
    if(!spec) {
        return null;
    }

    // private 
    let _package = "@mitchallen/playing-card-deck";

    var _deck = [];

    for( var s = SUIT.first; s <= SUIT.last; s++ ) {
        for( var r = RANK.first; r <= RANK.last; r++ ) {
            _deck.push(cardFactory({suit: s, rank: r}));
        }
    }

    return {
        // public 
        package: () => _package,
        health: () => "OK",
        size: () => _deck.length,
        shuffle: () => {
            _deck = shuffleFactory.create({ array: _deck }).shuffle();
        },
        dump: () => {
            _deck.forEach( card => {
                console.log( card );
            });
        },
        deal: (count) => {
            return count ? _deck.splice( 0, count ) : _deck.shift();
        },
        includes: function(card) {
            return (_deck.filter(function(c) {
                return c.suit === card.suit && c.rank === card.rank;
            })).length > 0;
        },
        remove: function(card) {
           _deck = (_deck.filter(function(c) {
                return !(c.suit === card.suit && c.rank === card.rank);
            })); 
        },
        insert: function(card) {
            if( this.includes(card) ) {
                return false;
            }
            if( ! RANK.isRank(card.rank) ) {
                return false;
            }
            if( ! SUIT.isSuit(card.suit) ) {
                return false;
            }
            // Unshift puts at start of array. Push would be the end.
            _deck.unshift(card);
            return true;
        }
    };
};
