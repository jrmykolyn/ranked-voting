// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor

// Project
const Voter = require( './voter' );
const Candidate = require( './candidate' );
const Tally = require( './tally' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------c
const electionDefaults = {
    numVoters: 100,
    numCandidates: 10,
};


// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
class Election {
    constructor( options = electionDefaults ) {
        this.settings = Object.assign( electionDefaults, ( typeof options === 'object' ? options : {} ) );

        this.voters = [];
        this.candidates = [];
        this.tally = new Tally();
    }

    /**
     * Wrapper around main/initialization logic.
     */
    run() {
        return new Promise( ( resolve, reject ) => {
            debug( 'Inside `init()`.' );

            // Create 'candidate' objects.
            debug( 'Assembling candidates.' );
            new Array( this.settings.numCandidates )
                .fill( null )
                .forEach( ( el, i, arr ) => {
                    this.candidates.push( new Candidate );
                } );

            // Create 'voter' objects.
            debug( 'Assembling voters.' );
            new Array( this.settings.numVoters )
                .fill( null )
                .forEach( () => {
                    this.voters.push( new Voter( {
                        candidateIds: Candidate.ids(),
                    } ) );
                } );

            // Tally
            debug( 'Parsing ballots.' );
            let winningCandidateId = this.tally.run( Voter.ballots() );

            // Compile summary.
            /// TODO

            // Resolve
            /// TODO
            debug( 'Election complete, resolving with winner.' );
            resolve( {
                winningCandidateId,
            } );
        } );
    }
}

/**
 * ...
 */
/// TEMP
function debug() {
    // DO NO THINGS
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Election;
