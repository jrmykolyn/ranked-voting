// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const { sample } = require( 'sfco-js-utils' ).ArrayUtils;

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const candidates = [];

let firstNames = [ 'Sarah', 'Jen', 'Jack', 'John', 'Steve', 'Quinn', 'Bob', 'Abdi', 'Rachel' ];
let lastNames = [ 'Smith', 'Brown', 'Watson', 'Black', 'Johnson', 'Williams' ];

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
class Candidate {
    static all() {
        return candidates;
    }

    static ids() {
        return candidates.map( c => c.id );
    }

    constructor() {
        candidates.push( this );

        this.id = candidates.length;
        this.ballots = [];
        this.firstName = sample( firstNames );
        this.lastName = sample( lastNames );
    }
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Candidate;
