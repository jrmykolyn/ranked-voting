// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const Ballots = [];

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
class Ballot {
    constructor( arr ) {
        this.votes = [];

        let count = arr.length;

        while ( this.votes.length < count ) {
            // If the input array contains more than 1x item, remove a random item and add it to `votes`.
            if ( arr.length === 1 ) {
                this.votes.push( arr[ 0 ] );
            // Otherwise, add the only item within the input array to `votes`.
            } else {
                this.votes.push( arr.splice( Math.floor( Math.random() * arr.length ), 1 )[ 0 ] );
            }
        }

    }
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Ballot;
