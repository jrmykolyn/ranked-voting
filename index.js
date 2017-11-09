// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const meow = require( 'meow' );

// Project


// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
const cli = meow();

// --------------------------------------------------
// DECLARE FUNCTIONS
// --------------------------------------------------
/**
 * Function prints arguments to stdout when process is running in `debug` mode.
 */
/// TODO: Move into dedicated `utils` module.
function debug() {
    if ( cli.flags.debug ) {
        console.log( ...( Array.prototype.slice.call( arguments, 0 ) ) );
    }
}

/**
 * Wrapper around main/initialization logic.
 */
/// TODO: Update definition to accept `options` (eg. allow `numVoters` to be configured, etc.).
function init() {
    debug( 'Inside `init()`.' );

    let election = {};

    let numVoters = 100;
    let voters = [];

    let numCandidates = 10;
    let candidates = {};

    let firstNames = [ 'Sarah', 'Jen', 'Jack', 'John', 'Steve', 'Quinn', 'Bob', 'Abdi', 'Rachel' ];
    let lastNames = [ 'Smith', 'Brown', 'Watson', 'Black', 'Johnson', 'Williams' ];

    // Create 'voter' objects.
    debug( 'Assembling voters.' );
    new Array( numVoters ).fill( null ).forEach( ( el, i, arr ) => {
        voters.push( {
            id: i,
        } );
    } );

    // Create 'candidate' objects.
    debug( 'Assembling candidates.' );
    new Array( numCandidates ).fill( null ).forEach( ( el, i, arr ) => {
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
    let resolvedElection = runElection( election, candidates, voters );

    debug( 'Election complete, declaring winner.' );
    console.log( `${resolvedElection.winner.firstName} ${resolvedElection.winner.lastName} won with ${resolvedElection.winner.ballots.length} votes.` );
}

/**
 * Wrapper around election logic (tallying votes, redistributing votes, etc.).
 *
 * @param {Object} election
 * @param {Object} candidates
 * @param {Array} voters
 * @return {Object}
 */
function runElection( election, candidates, voters ) {
    debug( '\n' );
    debug( 'Inside `runElection()`.' );

    // Tallying
    debug( 'Tallying votes.' );
    Object.keys( candidates ).forEach( ( k ) => {
        let candidate = candidates[ k ];

        debug( `- Candidate ${candidate.id} has ${candidate.ballots.length} votes` );

        if ( candidate.ballots.length > ( voters.length / 2 ) ) {
            debug( `-- Candidate ${candidate.id} has more than 50% of the votes.` );
            election.winner = candidate;
        }
    } );

    // Declaring winner
    if ( election.winner ) {
        debug( 'Winner determined' );
        return election;
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
        return runElection( election, candidates, voters );
    }
}

// --------------------------------------------------
// INITIALIZATION
// --------------------------------------------------
init();
