// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor

// Project

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
class Tally {
    constructor() {
        this.map = {};
    }

    run( ballots ) {
        let winningCandidateId = null;

        // Update `map`; identify winning candidate if possible.
        ballots.forEach( ( ballot ) => {
            let candidateId = ballot.votes[ 0 ];

            if ( winningCandidateId === null ) {
                this.map[ candidateId ] = ( this.map[ candidateId ] ) ? this.map[ candidateId ] + 1 : 1;
            }

            if ( this.map[ candidateId ] > ( ballots.length / 2 ) ) {
                winningCandidateId = candidateId;
            }
        } );

        // Return winning candidate ID if found.
        if ( winningCandidateId !== null ) {
            return winningCandidateId;

        // Otherwise:
        // - Identifiy candidate with fewest votes.
        // - Remove candidate with fewest votes from `map`.
        // - Remove references to candidates which are no longer eligible from each ballot.
        // - Recurse.
        } else {
            let candidateWithFewestVotes = null;

            Object.keys( this.map ).forEach( ( candidateId ) => {
                let voteCount = this.map[ candidateId ];

                if ( !candidateWithFewestVotes || voteCount < this.map[ candidateWithFewestVotes ] ) {
                    candidateWithFewestVotes = candidateId;
                }
            } );

            delete this.map[ candidateWithFewestVotes ];

            ballots.forEach( ( ballot ) => {
                while ( ballot.votes.length && !this.map[ ballot.votes[ 0 ] ] ) {
                    ballot.votes.shift();
                }
            } );

            return this.run( ballots );
        }
    }
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Tally;
