/**
    Module: @mitchallen/playing-card-deck
    Author: Mitch Allen
*/

/*jshint esversion: 6 */

"use strict";

module.exports.create = (spec) => {
    if(!spec) {
        return null;
    }
    // private 
    let _package = "@mitchallen/playing-card-deck";
    return {
        // public 
        package: () => _package,
        health: () => "OK"
    };
};