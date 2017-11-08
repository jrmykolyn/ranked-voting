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

// --------------------------------------------------
// INITIALIZATION
// --------------------------------------------------
/// TODO:
// - Create voters
// - Create candidates
// - Vote for candidates
// - Tally votes
// - Declare winner OR adjust ballots, redistribute, and re-tally.

// Declare vars
let election = {};

let numVoters = 100;
let voters = [];

let numCandidates = 10;
let candidates = {};

// Create 'voter' objects.
new Array( numVoters ).fill( null ).forEach( ( el, i, arr ) => {
    voters.push( {
        id: i,
    } );
} );

// Create 'candidate' objects.
new Array( numCandidates ).fill( null ).forEach( ( el, i, arr ) => {
    let candidate = {
        id: i,
        ballots: [],
    };

    candidates[ i ] = candidate;
} );

// Voting
voters.forEach( function( voter ) {
    // console.log( 'ASSEMBLING BALLOT FOR VOTER: ', voter.id );

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

    // console.log( 'BALLOT COMPLETE' );

    // console.log( 'ATTACHING BALLOT TO CANDIDATE' );

    candidates[ ballot[ 0 ] ].ballots.push( ballot );
} );

// Tallying
Object.keys( candidates ).forEach( ( k ) => {
    // console.log( 'LOGGING OUT VOTES FOR CANDIDATE:', k );
    // console.log( candidates[ k ].ballots.length );

    if ( candidates[ k ].ballots.length > ( voters.length / 2 ) ) {
        election.winner = candidates[ k ].id;
    }
} );

// Declaring winner
if ( election.winner ) {
    console.log( 'CANDIDATE WON:', election.winner );
} else {
    console.log( 'NO WINNER' );
}
