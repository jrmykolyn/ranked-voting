// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor

// Project
const Ballot = require( './ballot' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const voters = [];

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
class Voter {
    static ballots() {
        return voters.map( voter => voter.ballot );
    }

    constructor( options ) {
        voters.push( this );

        this.id = voters.length;
        this.ballot = new Ballot( options.candidateIds );
    }
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Voter;
