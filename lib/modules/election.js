// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
// Vendor
// Project

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
    }

    /**
     * Wrapper around main/initialization logic.
     */
    run() {
        console.log( 'INSIDE #run()' ); /// TEMP
        console.log( this ); /// TEMP

        return new Promise( ( resolve, reject ) => {
            debug( 'Inside `init()`.' );

            let voters = [];
            let candidates = {};

            let firstNames = [ 'Sarah', 'Jen', 'Jack', 'John', 'Steve', 'Quinn', 'Bob', 'Abdi', 'Rachel' ];
            let lastNames = [ 'Smith', 'Brown', 'Watson', 'Black', 'Johnson', 'Williams' ];

            // Create 'voter' objects.
            debug( 'Assembling voters.' );
            new Array( this.settings.numVoters ).fill( null ).forEach( ( el, i, arr ) => {
                /// TODO: Build out `Voter` class def.
                voters.push( {
                    id: i,
                } );
            } );

            // Create 'candidate' objects.
            debug( 'Assembling candidates.' );
            new Array( this.settings.numCandidates ).fill( null ).forEach( ( el, i, arr ) => {
                /// TODO: Build out `Candidate` class def.
                let candidate = {
                    id: i,
                    ballots: [],
                    firstName: firstNames[ Math.floor( Math.random() * firstNames.length ) ],
                    lastName: lastNames[ Math.floor( Math.random() * lastNames.length ) ],
                };

                candidates[ i ] = candidate;
            } );

            // Voting
            debug( 'Assembling ballots (eg. voting).' );
            voters.forEach( function( voter ) {
                let counter = 0;
                let candidateIds = Object.keys( candidates );

                /// TODO: Build out `Ballot` class def.
                let ballot = [];

                while ( counter < candidateIds.length ) {
                    let candidateId = candidateIds[ Math.floor(  Math.random() * candidateIds.length ) ];

                    if ( ballot.indexOf( candidateId ) === -1 ) {
                        ballot.push( candidateId );
                        counter++;
                    }
                }

                candidates[ ballot[ 0 ] ].ballots.push( ballot );
            } );

            // Run
            debug( 'Initiating election.' );
            let resolvedElection = tally( candidates, voters );

            debug( 'Election complete, resolving with winner.' );
            resolve( resolvedElection );
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

/**
 * Wrapper around election logic (tallying votes, redistributing votes, etc.).
 *
 * @param {Object} election
 * @param {Object} candidates
 * @param {Array} voters
 * @return {Object}
 */
function tally( candidates, voters ) {
    let result = {};

    debug( '\n' );
    debug( 'Inside `tally()`.' );

    // Tallying
    debug( 'Tallying votes.' );
    Object.keys( candidates ).forEach( ( k ) => {
        let candidate = candidates[ k ];

        debug( `- Candidate ${candidate.id} has ${candidate.ballots.length} votes` );

        if ( candidate.ballots.length > ( voters.length / 2 ) ) {
            debug( `-- Candidate ${candidate.id} has more than 50% of the votes.` );
            result.winner = candidate;
        }
    } );

    // Declaring winner
    if ( result.winner ) {
        debug( 'Winner determined' );
        return result;
    } else {
        debug( 'Winner NOT determined' );
        let candidateWithFewestVotes = null;

        // IDENTIFY CANDIDATE WITH FEWEST VOTES
        Object.keys( candidates ).forEach( ( k ) => {
            let candidate = candidates[ k ];

            if ( candidateWithFewestVotes === null || candidate.ballots.length < candidateWithFewestVotes.ballots.length ) {
                candidateWithFewestVotes = candidate;
            }
        } );

        debug( `Candidate ${candidateWithFewestVotes.id} has the fewest votes: ${candidateWithFewestVotes.ballots.length}` );

        // GRAB BALLOTS FROM CANDIDATE WITH FEWEST VOTES
        let ballotsToRedistribute = candidates[ candidateWithFewestVotes.id ].ballots;

        // REMOVE CANDIDATE
        delete candidates[ candidateWithFewestVotes.id ];

        // REDISTRIBUTE BALLOTS
        debug( 'Redistributing ballots.' );

        ballotsToRedistribute.forEach( ( ballot ) => {
            while ( !candidates[ ballot[ 0 ] ] && ballot.length ) {
                ballot = ballot.slice( 1 );
            }

            if ( ballot.length ) {
                debug( `- Redistributing ballot to candidate ${ballot[ 0 ]}` );

                candidates[ ballot[ 0 ] ].ballots.push( ballot );
            }
        } );

        // DO IT AGAIN
        return tally( candidates, voters );
    }
}

// --------------------------------------------------
// PUBLIC API
// --------------------------------------------------
module.exports = Election;
